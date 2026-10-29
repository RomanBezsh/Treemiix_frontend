"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { ChevronDown, ImagePlus, Play, Plus, X } from "lucide-react";
import type { SellerCategory, SellerListing, SellerProductFormValues } from "@/data/sellerDashboardData";

interface SellerAddProductModalProps {
  categories: SellerCategory[];
  onClose: () => void;
  onCreate: (listing: SellerListing) => void;
}

interface PreviewImage {
  id: string;
  name: string;
  url: string; // object URL, lives only in this browser tab
}

type FormErrors = Partial<Record<keyof SellerProductFormValues, string>>;

const MAX_IMAGES = 8;
const MAX_VIDEOS = 5;

interface YouTubeVideo {
  id: string; // YouTube video id
  url: string; // normalized watch URL
}

// Supports youtube.com/watch?v=, youtu.be/, /shorts/, /embed/ links
function parseYouTubeUrl(value: string): YouTubeVideo | null {
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^(www\.|m\.)/, "");
  let videoId: string | null = null;

  if (host === "youtu.be") {
    videoId = url.pathname.slice(1).split("/")[0];
  } else if (host === "youtube.com") {
    if (url.pathname === "/watch") videoId = url.searchParams.get("v");
    else {
      const match = url.pathname.match(/^\/(shorts|embed|live)\/([^/]+)/);
      videoId = match?.[2] ?? null;
    }
  }

  if (!videoId || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) return null;
  return { id: videoId, url: `https://www.youtube.com/watch?v=${videoId}` };
}

const initialValues: SellerProductFormValues = {
  name: "",
  slug: "",
  sku: "",
  categoryId: "",
  price: "",
  oldCost: "",
  stock: "1",
  description: "",
  features: "",
  asin: "",
  manufacturer: "",
  itemModelNumber: "",
  countryOfOrigin: "",
  productDimensions: "",
  itemWeight: "",
  warrantyInfo: "",
  binding: "",
  releaseDate: "",
};

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

function validate(values: SellerProductFormValues): FormErrors {
  const errors: FormErrors = {};
  const price = Number(values.price);
  const oldCost = Number(values.oldCost);
  const stock = Number(values.stock);

  if (values.name.trim().length < 3) errors.name = "Enter a product name (at least 3 characters).";
  if (!values.slug.trim()) errors.slug = "Slug is required.";
  if (!values.categoryId) errors.categoryId = "Choose a category.";
  if (!values.price || !Number.isFinite(price) || price <= 0) errors.price = "Price must be greater than 0.";
  if (values.oldCost && (!Number.isFinite(oldCost) || oldCost <= price)) {
    errors.oldCost = "Old price must be higher than the current price.";
  }
  if (values.stock === "" || !Number.isInteger(stock) || stock < 0) errors.stock = "Stock must be a whole number, 0 or more.";
  if (values.description.trim().length < 10) errors.description = "Add a description (at least 10 characters).";

  return errors;
}

const inputClass = (hasError: boolean) =>
  `h-[44px] w-full rounded-[12px] border bg-white px-[14px] text-[14px] text-[#333333] outline-none transition-colors placeholder:text-[#AAAAAA] focus:border-[#7C9BC0] ${
    hasError ? "border-[#FF825A]" : "border-[#DDDDDD]"
  }`;

function Field({
  label,
  htmlFor,
  error,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-[6px]">
      <label htmlFor={htmlFor} className="text-[13px] font-medium text-[#555555]">
        {label}
        {required && <span className="text-[#FF825A]"> *</span>}
      </label>
      {children}
      {error ? (
        <p className="text-[12px] text-[#FF825A]">{error}</p>
      ) : (
        hint && <p className="text-[12px] text-[#999999]">{hint}</p>
      )}
    </div>
  );
}

export default function SellerAddProductModal({ categories, onClose, onCreate }: SellerAddProductModalProps) {
  const formId = useId();
  const [values, setValues] = useState<SellerProductFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [videoInput, setVideoInput] = useState("");
  const [videoError, setVideoError] = useState("");

  const imagesRef = useRef<PreviewImage[]>([]);
  const isSubmittedRef = useRef(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const id = (field: keyof SellerProductFormValues) => `${formId}-${field}`;

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  // Focus, Escape to close, lock page scroll; free preview URLs if the form is discarded
  useEffect(() => {
    nameInputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (!isSubmittedRef.current) {
        imagesRef.current.forEach((image) => URL.revokeObjectURL(image.url));
      }
    };
  }, [onClose]);

  const setField = (field: keyof SellerProductFormValues, value: string) => {
    setValues((current) => {
      const next = { ...current, [field]: value };
      if (field === "name" && !isSlugEdited) next.slug = toSlug(value);
      return next;
    });
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleChange =
    (field: keyof SellerProductFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      if (field === "slug") setIsSlugEdited(true);
      setField(field, event.target.value);
    };

  const handleImagesSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).filter((file) => file.type.startsWith("image/"));
    const free = MAX_IMAGES - images.length;

    const added = files.slice(0, free).map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setImages((current) => [...current, ...added]);
    event.target.value = "";
  };

  const removeImage = (imageId: string) => {
    setImages((current) => {
      const image = current.find((item) => item.id === imageId);
      if (image) URL.revokeObjectURL(image.url);
      return current.filter((item) => item.id !== imageId);
    });
  };

  const addVideo = () => {
    if (!videoInput.trim()) return;

    const video = parseYouTubeUrl(videoInput);
    if (!video) {
      setVideoError("Paste a valid YouTube link, e.g. https://www.youtube.com/watch?v=...");
      return;
    }
    if (videos.some((item) => item.id === video.id)) {
      setVideoError("This video is already added.");
      return;
    }

    setVideos((current) => [...current, video]);
    setVideoInput("");
    setVideoError("");
  };

  const removeVideo = (videoId: string) => {
    setVideos((current) => current.filter((item) => item.id !== videoId));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    // Frontend only for now: the product lives in page state until reload
    isSubmittedRef.current = true;
    onCreate({
      id: `local-${Date.now()}`,
      name: values.name.trim(),
      imageUrl: images[0]?.url ?? "",
      price: Number(values.price),
      oldCost: values.oldCost ? Number(values.oldCost) : null,
      stock: Number(values.stock),
      sku: values.sku.trim() || undefined,
      videos: videos.map((video) => video.url),
      isLocal: true,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 font-[var(--font-roboto)] sm:items-center sm:p-[24px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${formId}-title`}
        className="tm-fade-up flex max-h-[92vh] w-full max-w-[820px] flex-col overflow-hidden rounded-t-[24px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] sm:rounded-[24px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-[12px] border-b border-[#EEEEEE] px-[20px] py-[16px] sm:px-[28px]">
          <div>
            <h2 id={`${formId}-title`} className="text-[22px] font-black leading-[130%] text-[#333333]/80 sm:text-[26px]">
              Add a product
            </h2>
            <p className="text-[13px] text-[#777777]">Fields marked with * are required</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#F8F8F8] text-[#555555] transition-colors hover:bg-[#EEEEEE]"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Form */}
        <form
          id={`${formId}-form`}
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-1 flex-col gap-[24px] overflow-y-auto px-[20px] py-[20px] sm:px-[28px] sm:py-[24px]"
        >
          {/* Basic info */}
          <fieldset className="flex flex-col gap-[14px]">
            <legend className="mb-[12px] text-[16px] font-medium text-[#333333]">Basic info</legend>

            <Field label="Product name" htmlFor={id("name")} error={errors.name} required>
              <input
                ref={nameInputRef}
                id={id("name")}
                value={values.name}
                onChange={handleChange("name")}
                placeholder="e.g. Wireless Headphones X200"
                className={inputClass(Boolean(errors.name))}
              />
            </Field>

            <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
              <Field label="Slug" htmlFor={id("slug")} error={errors.slug} required hint="Used in the product URL">
                <input
                  id={id("slug")}
                  value={values.slug}
                  onChange={handleChange("slug")}
                  placeholder="wireless-headphones-x200"
                  className={inputClass(Boolean(errors.slug))}
                />
              </Field>

              <Field label="SKU" htmlFor={id("sku")}>
                <input
                  id={id("sku")}
                  value={values.sku}
                  onChange={handleChange("sku")}
                  placeholder="WH-X200"
                  className={inputClass(false)}
                />
              </Field>
            </div>

            <Field label="Category" htmlFor={id("categoryId")} error={errors.categoryId} required>
              <select
                id={id("categoryId")}
                value={values.categoryId}
                onChange={handleChange("categoryId")}
                className={`${inputClass(Boolean(errors.categoryId))} ${values.categoryId ? "" : "text-[#AAAAAA]"}`}
              >
                <option value="">Choose a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id} className="text-[#333333]">
                    {category.name}
                  </option>
                ))}
              </select>
            </Field>
          </fieldset>

          {/* Price and stock */}
          <fieldset className="flex flex-col gap-[14px]">
            <legend className="mb-[12px] text-[16px] font-medium text-[#333333]">Price and stock</legend>

            <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-3">
              <Field label="Price ($)" htmlFor={id("price")} error={errors.price} required>
                <input
                  id={id("price")}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={values.price}
                  onChange={handleChange("price")}
                  placeholder="49.99"
                  className={inputClass(Boolean(errors.price))}
                />
              </Field>

              <Field label="Old price ($)" htmlFor={id("oldCost")} error={errors.oldCost} hint="Shows a discount">
                <input
                  id={id("oldCost")}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={values.oldCost}
                  onChange={handleChange("oldCost")}
                  placeholder="59.99"
                  className={inputClass(Boolean(errors.oldCost))}
                />
              </Field>

              <Field label="Stock" htmlFor={id("stock")} error={errors.stock} required>
                <input
                  id={id("stock")}
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="1"
                  value={values.stock}
                  onChange={handleChange("stock")}
                  className={inputClass(Boolean(errors.stock))}
                />
              </Field>
            </div>
          </fieldset>

          {/* Images */}
          <fieldset className="flex flex-col gap-[12px]">
            <legend className="mb-[12px] text-[16px] font-medium text-[#333333]">
              Images <span className="text-[13px] font-normal text-[#999999]">({images.length}/{MAX_IMAGES}, first one is main)</span>
            </legend>

            <div className="flex flex-wrap gap-[12px]">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`group relative h-[90px] w-[90px] overflow-hidden rounded-[14px] border-2 bg-[#F8F8F8] ${
                    index === 0 ? "border-[#FFB15A]" : "border-transparent"
                  }`}
                >
                  <Image src={image.url} alt={image.name} fill sizes="90px" unoptimized className="object-contain p-[4px]" />
                  {index === 0 && (
                    <span className="absolute bottom-[4px] left-[4px] rounded-full bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[6px] py-[1px] text-[10px] font-medium text-white">
                      Main
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    aria-label={`Remove ${image.name}`}
                    className="absolute right-[4px] top-[4px] flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white/90 text-[#555555] shadow-sm transition-colors hover:text-[#FF825A]"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                </div>
              ))}

              {images.length < MAX_IMAGES && (
                <label className="flex h-[90px] w-[90px] cursor-pointer flex-col items-center justify-center gap-[4px] rounded-[14px] border-2 border-dashed border-[#7C9BC0] text-[#7C9BC0] transition-colors hover:bg-[#7C9BC0]/10">
                  <ImagePlus size={22} aria-hidden="true" />
                  <span className="text-[11px] font-medium">Add photos</span>
                  <input type="file" accept="image/*" multiple onChange={handleImagesSelected} className="sr-only" />
                </label>
              )}
            </div>
          </fieldset>

          {/* YouTube videos */}
          <fieldset className="flex flex-col gap-[12px]">
            <legend className="mb-[12px] text-[16px] font-medium text-[#333333]">
              YouTube videos <span className="text-[13px] font-normal text-[#999999]">({videos.length}/{MAX_VIDEOS}, optional)</span>
            </legend>

            {videos.length < MAX_VIDEOS && (
              <div className="flex flex-col gap-[6px]">
                <label htmlFor={`${formId}-video`} className="sr-only">
                  YouTube link
                </label>
                <div className="flex gap-[10px]">
                  <input
                    id={`${formId}-video`}
                    type="url"
                    inputMode="url"
                    value={videoInput}
                    onChange={(event) => {
                      setVideoInput(event.target.value);
                      if (videoError) setVideoError("");
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addVideo();
                      }
                    }}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className={inputClass(Boolean(videoError))}
                  />
                  <button
                    type="button"
                    onClick={addVideo}
                    className="flex h-[44px] shrink-0 items-center gap-[6px] rounded-[12px] border-[2px] border-[#7C9BC0] px-[14px] text-[14px] font-medium text-[#7C9BC0] transition-colors hover:bg-[#7C9BC0]/10"
                  >
                    <Plus size={16} aria-hidden="true" />
                    Add
                  </button>
                </div>
                {videoError ? (
                  <p className="text-[12px] text-[#FF825A]">{videoError}</p>
                ) : (
                  <p className="text-[12px] text-[#999999]">Supports youtube.com, youtu.be and Shorts links</p>
                )}
              </div>
            )}

            {videos.length > 0 && (
              <div className="flex flex-wrap gap-[12px]">
                {videos.map((video) => (
                  <div key={video.id} className="relative h-[90px] w-[160px] overflow-hidden rounded-[14px] bg-[#F8F8F8]">
                    <a href={video.url} target="_blank" rel="noopener noreferrer" aria-label="Open video on YouTube" className="block h-full w-full">
                      <Image
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt="YouTube video preview"
                        fill
                        sizes="160px"
                        unoptimized
                        className="object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white/90 text-[#FF825A]">
                          <Play size={16} fill="currentColor" aria-hidden="true" />
                        </span>
                      </span>
                    </a>
                    <button
                      type="button"
                      onClick={() => removeVideo(video.id)}
                      aria-label="Remove video"
                      className="absolute right-[4px] top-[4px] flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white/90 text-[#555555] shadow-sm transition-colors hover:text-[#FF825A]"
                    >
                      <X size={14} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </fieldset>

          {/* Description */}
          <fieldset className="flex flex-col gap-[14px]">
            <legend className="mb-[12px] text-[16px] font-medium text-[#333333]">Description</legend>

            <Field label="Description" htmlFor={id("description")} error={errors.description} required>
              <textarea
                id={id("description")}
                value={values.description}
                onChange={handleChange("description")}
                rows={4}
                placeholder="What is it, who is it for, what makes it good?"
                className={`${inputClass(Boolean(errors.description))} h-auto resize-y py-[10px]`}
              />
            </Field>

            <Field label="Key features" htmlFor={id("features")} hint="One feature per line">
              <textarea
                id={id("features")}
                value={values.features}
                onChange={handleChange("features")}
                rows={3}
                placeholder={"Up to 40 hours of battery life\nActive noise cancellation"}
                className={`${inputClass(false)} h-auto resize-y py-[10px]`}
              />
            </Field>
          </fieldset>

          {/* Product details (optional) */}
          <div className="rounded-[16px] bg-[#F8F8F8]">
            <button
              type="button"
              onClick={() => setShowDetails((current) => !current)}
              aria-expanded={showDetails}
              className="flex w-full items-center justify-between px-[16px] py-[14px] text-left text-[16px] font-medium text-[#333333]"
            >
              Product details <span className="text-[13px] font-normal text-[#999999]">optional</span>
              <ChevronDown
                size={20}
                aria-hidden="true"
                className={`ml-auto text-[#777777] transition-transform ${showDetails ? "rotate-180" : ""}`}
              />
            </button>

            {showDetails && (
              <div className="grid grid-cols-1 gap-[14px] px-[16px] pb-[16px] sm:grid-cols-2">
                {(
                  [
                    ["asin", "ASIN", "e.g. B0C8PSMPTH"],
                    ["manufacturer", "Manufacturer", "e.g. Sony"],
                    ["itemModelNumber", "Model number", "e.g. WH-1000XM5"],
                    ["countryOfOrigin", "Country of origin", "e.g. China"],
                    ["productDimensions", "Dimensions", "e.g. 20 x 15 x 8 cm"],
                    ["itemWeight", "Weight", "e.g. 250 g"],
                    ["warrantyInfo", "Warranty", "e.g. 1 year"],
                    ["binding", "Binding", "e.g. Electronics"],
                  ] as const
                ).map(([field, label, placeholder]) => (
                  <Field key={field} label={label} htmlFor={id(field)}>
                    <input
                      id={id(field)}
                      value={values[field]}
                      onChange={handleChange(field)}
                      placeholder={placeholder}
                      className={inputClass(false)}
                    />
                  </Field>
                ))}

                <Field label="Release date" htmlFor={id("releaseDate")}>
                  <input
                    id={id("releaseDate")}
                    type="date"
                    value={values.releaseDate}
                    onChange={handleChange("releaseDate")}
                    className={inputClass(false)}
                  />
                </Field>
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-[10px] border-t border-[#EEEEEE] px-[20px] py-[14px] sm:flex-row sm:items-center sm:justify-end sm:px-[28px]">
          <button
            type="button"
            onClick={onClose}
            className="h-[46px] rounded-[12px] border-[2px] border-[#7C9BC0] px-[24px] text-[16px] font-medium text-[#7C9BC0] transition-colors hover:bg-[#7C9BC0]/10"
          >
            Cancel
          </button>
          <button
            type="submit"
            form={`${formId}-form`}
            className="
              h-[46px] rounded-[12px]
              bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)]
              px-[28px] text-[16px] font-medium text-white
              transition-all duration-200 ease-out
              hover:-translate-y-[2px]
              hover:shadow-[0_8px_18px_rgba(255,130,90,0.28)]
              active:translate-y-0
              active:scale-[0.97]
            "
          >
            Save product
          </button>
        </div>
      </div>
    </div>
  );
}
