// Shown while a route segment renders on the server, e.g. the home page waiting for the backend
// (on Render the backend may need up to a minute to wake up).
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 px-4 text-center"
    >
      <span
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-[#D6D6D6] border-t-[#7C9BC0]"
      />
      <p className="text-[16px] text-[#555555]">Loading…</p>
    </div>
  );
}
