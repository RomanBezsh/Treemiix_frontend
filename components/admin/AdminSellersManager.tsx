"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Ban,
  CheckCircle2,
  CreditCard,
  Loader2,
  PlayCircle,
  RefreshCw,
  Search,
  Store,
  X,
  XCircle,
} from "lucide-react";
import {
  AdminSeller,
  approveSeller,
  getAdminSellers,
  markSellerSubscriptionPaid,
  reactivateSeller,
  rejectSeller,
  SellerApiError,
  SellerStatus,
  suspendSeller,
} from "@/lib/sellerApi";

type StatusFilter = "All" | SellerStatus;

const statusFilters: StatusFilter[] = [
  "All",
  "PendingVerification",
  "Active",
  "Rejected",
  "Suspended",
  "Inactive",
  "Draft",
];

const statusLabels: Record<SellerStatus, string> = {
  Draft: "Draft",
  PendingVerification: "Pending",
  Active: "Active",
  Rejected: "Rejected",
  Suspended: "Suspended",
  Inactive: "Inactive",
};

const statusStyles: Record<SellerStatus, string> = {
  Draft: "bg-slate-100 text-slate-700",
  PendingVerification: "bg-amber-100 text-amber-800",
  Active: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-red-100 text-red-700",
  Suspended: "bg-red-100 text-red-700",
  Inactive: "bg-slate-100 text-slate-600",
};

function messageOf(error: unknown): string {
  if (error instanceof SellerApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminSellersManager() {
  const [filter, setFilter] = useState<StatusFilter>("PendingVerification");
  const [sellers, setSellers] = useState<AdminSeller[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [selected, setSelected] = useState<AdminSeller | null>(null);
  const [rejectTarget, setRejectTarget] = useState<AdminSeller | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const load = useCallback(async () => {
    try {
      const data = await getAdminSellers(
        filter === "All" ? undefined : filter,
      );
      setSellers(data);
      setError(null);
    } catch (loadError) {
      setError(messageOf(loadError));
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    let cancelled = false;

    getAdminSellers(filter === "All" ? undefined : filter)
      .then((data) => {
        if (cancelled) return;
        setSellers(data);
        setError(null);
      })
      .catch((loadError) => {
        if (!cancelled) setError(messageOf(loadError));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [filter]);

  const refresh = () => {
    setLoading(true);
    setError(null);
    void load();
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return sellers;

    return sellers.filter((seller) => {
      const haystack = [
        seller.storeName,
        seller.storeSlug,
        seller.userEmail,
        seller.userFirstName,
        seller.userLastName,
        seller.legalName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [search, sellers]);

  const runAction = async (
    seller: AdminSeller,
    action: () => Promise<unknown>,
    successMessage: string,
  ) => {
    setBusyId(seller.id);
    setError(null);
    setNotice(null);

    try {
      await action();
      setNotice(successMessage);
      setSelected(null);
      await load();
    } catch (actionError) {
      setError(messageOf(actionError));
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (event: FormEvent) => {
    event.preventDefault();
    if (!rejectTarget) return;

    const reason = rejectReason.trim();
    if (reason.length < 3) {
      setError("Enter a rejection reason (at least 3 characters).");
      return;
    }

    const target = rejectTarget;
    setRejectTarget(null);
    setRejectReason("");

    await runAction(
      target,
      () => rejectSeller(target.id, reason),
      "Seller application rejected.",
    );
  };

  return (
    <div className="rounded-[20px] bg-[#F8F8F8] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:p-6">
      <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h2 className="flex items-center gap-2 text-[22px] font-semibold text-[#333333]">
            <Store size={22} className="text-[#49516D]" />
            Seller Management
          </h2>
          <p className="mt-1 text-[13px] text-[#777777]">
            Review applications, manage subscriptions and store access.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#999]"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search store, owner or email..."
              className="h-[42px] w-full rounded-[10px] border border-[#DDD] bg-white pl-9 pr-3 text-[13px] text-[#333] outline-none sm:w-[260px]"
            />
          </div>

          <select
            value={filter}
            onChange={(event) => {
              setLoading(true);
              setFilter(event.target.value as StatusFilter);
            }}
            className="h-[42px] rounded-[10px] border border-[#DDD] bg-white px-3 text-[13px] text-[#333] outline-none"
          >
            {statusFilters.map((status) => (
              <option key={status} value={status}>
                {status === "All" ? "All statuses" : statusLabels[status]}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            className="inline-flex h-[42px] items-center justify-center gap-2 rounded-[10px] border border-[#D8DCE5] bg-white px-4 text-[13px] font-medium text-[#49516D] disabled:opacity-60"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-[12px] border border-red-200 bg-red-50 p-3 text-[13px] text-red-700">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {notice && (
        <div className="mb-4 flex items-start gap-2 rounded-[12px] border border-emerald-200 bg-emerald-50 p-3 text-[13px] text-emerald-800">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {loading ? (
        <div className="flex min-h-[220px] items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-[#49516D]" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-[14px] border border-dashed border-[#D8DCE5] bg-white p-10 text-center text-[14px] text-[#888]">
          No sellers found for this filter.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-[14px] border border-[#EAECF0] bg-white">
          <table className="w-full min-w-[900px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#EAECF0] text-[11px] uppercase tracking-wide text-[#888]">
                <th className="px-4 py-3">Store</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Subscription</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F2F5]">
              {filtered.map((seller) => {
                const busy = busyId === seller.id;

                return (
                  <tr key={seller.id} className="align-top">
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => setSelected(seller)}
                        className="text-left font-medium text-[#333] hover:text-[#49516D] hover:underline"
                      >
                        {seller.storeName || "Unnamed store"}
                      </button>
                      <p className="mt-0.5 text-[12px] text-[#888]">
                        /seller/{seller.storeSlug || "—"}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-[#333]">
                        {seller.userFirstName} {seller.userLastName}
                      </p>
                      <p className="mt-0.5 text-[12px] text-[#888]">
                        {seller.userEmail}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[seller.status]}`}
                      >
                        {statusLabels[seller.status]}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-[#333]">
                        {seller.subscriptionStatus}
                      </p>
                      <p className="mt-0.5 text-[12px] text-[#888]">
                        {seller.subscriptionPaidUntil
                          ? `Paid until ${formatDate(seller.subscriptionPaidUntil)}`
                          : "Not paid"}
                      </p>
                      {seller.status === "Active" && !seller.canSell && (
                        <p className="mt-1 text-[11px] font-medium text-amber-700">
                          Selling blocked
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-4 text-[#666]">
                      {formatDate(seller.submittedAt)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap justify-end gap-1.5">
                        {seller.status === "PendingVerification" && (
                          <>
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() =>
                                void runAction(
                                  seller,
                                  () => approveSeller(seller.id),
                                  "Seller approved and subscription started.",
                                )
                              }
                              className="inline-flex h-[32px] items-center gap-1 rounded-[8px] bg-emerald-50 px-2.5 text-[12px] font-medium text-emerald-700 disabled:opacity-50"
                            >
                              {busy ? (
                                <Loader2 size={13} className="animate-spin" />
                              ) : (
                                <CheckCircle2 size={13} />
                              )}
                              Approve
                            </button>
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => {
                                setRejectTarget(seller);
                                setRejectReason("");
                                setError(null);
                              }}
                              className="inline-flex h-[32px] items-center gap-1 rounded-[8px] bg-red-50 px-2.5 text-[12px] font-medium text-red-600 disabled:opacity-50"
                            >
                              <XCircle size={13} />
                              Reject
                            </button>
                          </>
                        )}

                        {seller.status === "Active" && (
                          <>
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() =>
                                void runAction(
                                  seller,
                                  () =>
                                    markSellerSubscriptionPaid(seller.id),
                                  "Subscription marked as paid for 30 days.",
                                )
                              }
                              className="inline-flex h-[32px] items-center gap-1 rounded-[8px] bg-blue-50 px-2.5 text-[12px] font-medium text-blue-700 disabled:opacity-50"
                            >
                              {busy ? (
                                <Loader2 size={13} className="animate-spin" />
                              ) : (
                                <CreditCard size={13} />
                              )}
                              Mark paid
                            </button>
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() =>
                                void runAction(
                                  seller,
                                  () => suspendSeller(seller.id),
                                  "Seller suspended.",
                                )
                              }
                              className="inline-flex h-[32px] items-center gap-1 rounded-[8px] bg-amber-50 px-2.5 text-[12px] font-medium text-amber-700 disabled:opacity-50"
                            >
                              <Ban size={13} />
                              Suspend
                            </button>
                          </>
                        )}

                        {(seller.status === "Suspended" ||
                          seller.status === "Inactive") && (
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() =>
                              void runAction(
                                seller,
                                () => reactivateSeller(seller.id),
                                "Seller reactivated.",
                              )
                            }
                            className="inline-flex h-[32px] items-center gap-1 rounded-[8px] bg-emerald-50 px-2.5 text-[12px] font-medium text-emerald-700 disabled:opacity-50"
                          >
                            {busy ? (
                              <Loader2 size={13} className="animate-spin" />
                            ) : (
                              <PlayCircle size={13} />
                            )}
                            Reactivate
                          </button>
                        )}

                        {seller.status === "Rejected" && (
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() =>
                              void runAction(
                                seller,
                                () => approveSeller(seller.id),
                                "Seller approved and subscription started.",
                              )
                            }
                            className="inline-flex h-[32px] items-center gap-1 rounded-[8px] bg-emerald-50 px-2.5 text-[12px] font-medium text-emerald-700 disabled:opacity-50"
                          >
                            <CheckCircle2 size={13} />
                            Approve
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setSelected(seller)}
                          className="inline-flex h-[32px] items-center rounded-[8px] border border-[#D8DCE5] px-2.5 text-[12px] font-medium text-[#555]"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-[720px] overflow-y-auto rounded-[20px] bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[22px] font-semibold text-[#333]">
                  {selected.storeName || "Unnamed store"}
                </h3>
                <p className="mt-1 text-[13px] text-[#888]">
                  /seller/{selected.storeSlug || "—"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full p-2 text-[#888] hover:bg-[#F3F5F9]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-[12px] font-semibold ${statusStyles[selected.status]}`}
              >
                {statusLabels[selected.status]}
              </span>
              <span className="rounded-full bg-[#F3F5F9] px-3 py-1 text-[12px] text-[#555]">
                {selected.subscriptionStatus}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-[12px] ${
                  selected.canSell
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {selected.canSell ? "Can sell" : "Cannot sell"}
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Detail label="Owner">
                {selected.userFirstName} {selected.userLastName}
                <br />
                <span className="text-[#777]">{selected.userEmail}</span>
              </Detail>
              <Detail label="Business type">{selected.businessType}</Detail>
              <Detail label="Legal name">{selected.legalName || "—"}</Detail>
              <Detail label="Country">{selected.country || "—"}</Detail>
              <Detail label="Tax number">{selected.taxNumber || "—"}</Detail>
              <Detail label="Legal address">
                {selected.legalAddress || "—"}
              </Detail>
              <Detail label="Bank account">
                {selected.bankAccount || "—"}
              </Detail>
              <Detail label="Support">
                {selected.supportEmail || "—"}
                <br />
                <span className="text-[#777]">
                  {selected.supportPhone || "—"}
                </span>
              </Detail>
              <Detail label="Commission">
                {(selected.commissionRate * 100).toFixed(1)}%
              </Detail>
              <Detail label="Rating">
                {selected.rating.toFixed(1)}
              </Detail>
              <Detail label="Submitted">
                {formatDate(selected.submittedAt)}
              </Detail>
              <Detail label="Approved">
                {formatDate(selected.approvedAt)}
              </Detail>
              <Detail label="Paid until">
                {formatDate(selected.subscriptionPaidUntil)}
              </Detail>
              <Detail label="Created">
                {formatDate(selected.createdAt)}
              </Detail>
            </div>

            {selected.description && (
              <div className="mt-4 rounded-[12px] bg-[#F8F8F8] p-4 text-[13px] leading-6 text-[#555]">
                {selected.description}
              </div>
            )}

            {selected.rejectionReason && (
              <div className="mt-4 rounded-[12px] border border-red-200 bg-red-50 p-4 text-[13px] text-red-700">
                <p className="font-semibold">Rejection reason</p>
                <p className="mt-1">{selected.rejectionReason}</p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              {selected.status === "PendingVerification" && (
                <>
                  <button
                    type="button"
                    disabled={busyId === selected.id}
                    onClick={() =>
                      void runAction(
                        selected,
                        () => approveSeller(selected.id),
                        "Seller approved and subscription started.",
                      )
                    }
                    className="inline-flex h-[40px] items-center gap-2 rounded-[10px] bg-emerald-600 px-5 text-[13px] font-medium text-white disabled:opacity-60"
                  >
                    <CheckCircle2 size={15} /> Approve
                  </button>
                  <button
                    type="button"
                    disabled={busyId === selected.id}
                    onClick={() => {
                      setRejectTarget(selected);
                      setRejectReason("");
                      setError(null);
                    }}
                    className="inline-flex h-[40px] items-center gap-2 rounded-[10px] bg-red-50 px-5 text-[13px] font-medium text-red-600 disabled:opacity-60"
                  >
                    <XCircle size={15} /> Reject
                  </button>
                </>
              )}

              {selected.status === "Active" && (
                <>
                  <button
                    type="button"
                    disabled={busyId === selected.id}
                    onClick={() =>
                      void runAction(
                        selected,
                        () => markSellerSubscriptionPaid(selected.id),
                        "Subscription marked as paid for 30 days.",
                      )
                    }
                    className="inline-flex h-[40px] items-center gap-2 rounded-[10px] bg-[#49516D] px-5 text-[13px] font-medium text-white disabled:opacity-60"
                  >
                    <CreditCard size={15} /> Mark paid
                  </button>
                  <button
                    type="button"
                    disabled={busyId === selected.id}
                    onClick={() =>
                      void runAction(
                        selected,
                        () => suspendSeller(selected.id),
                        "Seller suspended.",
                      )
                    }
                    className="inline-flex h-[40px] items-center gap-2 rounded-[10px] bg-amber-50 px-5 text-[13px] font-medium text-amber-700 disabled:opacity-60"
                  >
                    <Ban size={15} /> Suspend
                  </button>
                </>
              )}

              {(selected.status === "Suspended" ||
                selected.status === "Inactive") && (
                <button
                  type="button"
                  disabled={busyId === selected.id}
                  onClick={() =>
                    void runAction(
                      selected,
                      () => reactivateSeller(selected.id),
                      "Seller reactivated.",
                    )
                  }
                  className="inline-flex h-[40px] items-center gap-2 rounded-[10px] bg-emerald-600 px-5 text-[13px] font-medium text-white disabled:opacity-60"
                >
                  <PlayCircle size={15} /> Reactivate
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {rejectTarget && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setRejectTarget(null)}
        >
          <form
            onSubmit={handleReject}
            className="w-full max-w-[520px] rounded-[20px] bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="text-[20px] font-semibold text-[#333]">
              Reject application
            </h3>
            <p className="mt-1 text-[13px] text-[#777]">
              {rejectTarget.storeName || "This seller"} will see this reason and
              can fix the details and submit again.
            </p>

            <textarea
              value={rejectReason}
              onChange={(event) => setRejectReason(event.target.value)}
              rows={4}
              minLength={3}
              maxLength={500}
              required
              placeholder="For example: the tax number does not match the legal name."
              className="mt-4 w-full rounded-[10px] border border-[#D8DCE5] px-3 py-2.5 text-[14px] outline-none focus:border-[#7C9BC0]"
            />

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRejectTarget(null)}
                className="h-[40px] rounded-[10px] border border-[#D8DCE5] px-5 text-[13px] text-[#555]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busyId === rejectTarget.id}
                className="inline-flex h-[40px] items-center gap-2 rounded-[10px] bg-red-600 px-5 text-[13px] font-medium text-white disabled:opacity-60"
              >
                {busyId === rejectTarget.id && (
                  <Loader2 size={14} className="animate-spin" />
                )}
                Reject application
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[12px] border border-[#EAECF0] p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#888]">
        {label}
      </p>
      <div className="mt-1 text-[13px] leading-6 text-[#333]">{children}</div>
    </div>
  );
}
