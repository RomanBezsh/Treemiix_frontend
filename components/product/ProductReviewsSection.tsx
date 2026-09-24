"use client";

import Image from "next/image";
import {
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
} from "react";

interface Review {
  id: string | number;
  userName: string;
  date: string;
  rating: number;
  title: string;
  isVerifiedPurchase: boolean;
  imageUrl?: string;
  comment: string;
  mediaNames?: string[];
}

interface ReviewCardProps {
  review: Review;
}

const ProductReviewsSection = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockReview: Review = {
    id: 1,
    userName: "AAAA",
    date: "August 30, 2017",
    rating: 5,
    title: "Definitely WORTH IT!!!",
    isVerifiedPurchase: true,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    comment: "Great product! Highly recommended.",
  };

  const [reviews, setReviews] = useState<Review[]>([
    mockReview,
  ]);

  const handleMediaChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) {
      return;
    }

    const newFiles = Array.from(event.target.files);

    setMediaFiles((current) => [
      ...current,
      ...newFiles,
    ]);
  };

  const removeMedia = (index: number) => {
    setMediaFiles((current) =>
      current.filter(
        (_, fileIndex) => fileIndex !== index,
      ),
    );
  };

  const submitReview = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const value = reviewText.trim();

    if (!value || rating === 0) {
      return;
    }

    const newReview: Review = {
      id: `review-${Date.now()}`,
      userName: "You",
      date: "just now",
      rating,
      title: "My review",
      isVerifiedPurchase: true,
      comment: value,
      mediaNames: mediaFiles.map((file) => file.name),
    };

    setReviews((current) => [
      newReview,
      ...current,
    ]);

    setRating(0);
    setHoveredRating(0);
    setReviewText("");
    setMediaFiles([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section
      className="
        mb-[70px] w-full max-w-[1690px]
        px-[16px]
        font-[var(--font-roboto)]
        sm:px-[24px]
        lg:mb-[148px]
        lg:px-[40px]
      "
    >
      {/* Write review */}
      <div
        className="
          mb-[48px] w-full
          rounded-[18px]
          border border-[#E5E5E5]
          bg-[#F8F8F8]
          px-[16px] py-[20px]
          shadow-[0_2px_5px_rgba(0,0,0,0.07)]
          sm:rounded-[22px]
          sm:px-[24px] sm:py-[24px]
          lg:mb-[60px]
          lg:rounded-[24px]
          lg:px-[28px] lg:py-[26px]
        "
      >
        {/* Form title */}
        <h2
          className="
            text-[21px] font-semibold leading-[130%] text-[#333333]
            sm:text-[24px]
          "
        >
          Write a review
        </h2>

        <p
          className="
            mt-[5px]
            text-[13px] leading-[150%] text-[#828282]
            sm:text-[14px]
          "
        >
          Share your experience with this product.
        </p>

        <form
          onSubmit={submitReview}
          className="mt-[22px] sm:mt-[24px]"
        >
          {/* Rating */}
          <div>
            <p
              className="
                mb-[8px]
                text-[15px] font-medium text-[#333333]
                sm:text-[16px]
              "
            >
              Your rating
            </p>

            <div
              className="flex w-fit flex-wrap items-center gap-[5px] sm:gap-[6px]"
              onMouseLeave={() => setHoveredRating(0)}
            >
              {[1, 2, 3, 4, 5].map((star) => {
                const active =
                  star <= (hoveredRating || rating);

                return (
                  <button
                    key={star}
                    type="button"
                    aria-label={`${star} stars`}
                    onMouseEnter={() =>
                      setHoveredRating(star)
                    }
                    onFocus={() =>
                      setHoveredRating(star)
                    }
                    onBlur={() =>
                      setHoveredRating(0)
                    }
                    onClick={() => setRating(star)}
                    className="
                      flex h-[34px] w-[34px]
                      items-center justify-center
                      rounded-full
                      transition-all duration-150 ease-out
                      hover:scale-[1.12]
                      hover:bg-white
                      active:scale-90
                      sm:h-[38px] sm:w-[38px]
                    "
                  >
                    <Image
                      src={
                        active
                          ? "/common/star_filled.svg"
                          : "/common/star_empty.svg"
                      }
                      alt=""
                      width={28}
                      height={28}
                      aria-hidden="true"
                      className="
                        h-[25px] w-[25px]
                        sm:h-[28px] sm:w-[28px]
                      "
                    />
                  </button>
                );
              })}

              {rating > 0 && (
                <span
                  className="
                    ml-[5px]
                    text-[13px] text-[#828282]
                    sm:ml-[8px]
                    sm:text-[14px]
                  "
                >
                  {rating} / 5
                </span>
              )}
            </div>
          </div>

          {/* Review text */}
          <div className="mt-[20px] sm:mt-[22px]">
            <label
              htmlFor="review-text"
              className="
                mb-[8px] block
                text-[15px] font-medium text-[#333333]
                sm:text-[16px]
              "
            >
              Your review
            </label>

            <textarea
              id="review-text"
              value={reviewText}
              onChange={(event) =>
                setReviewText(event.target.value)
              }
              rows={6}
              placeholder="What did you like or dislike? How was your experience with this product?"
              className="
                min-h-[150px] w-full resize-y
                rounded-[16px]
                border border-[#E1E1E1]
                bg-white
                px-[14px] py-[12px]
                text-[14px] leading-[150%] text-[#333333]
                outline-none
                transition-all duration-200
                placeholder:text-[#B3B3B3]
                focus:border-[#7C9BC0]
                focus:shadow-[0_4px_12px_rgba(124,155,192,0.14)]
                sm:rounded-[18px]
                sm:px-[18px] sm:py-[14px]
                sm:text-[16px]
              "
            />
          </div>

          {/* Media */}
          <div className="mt-[20px] sm:mt-[22px]">
            <p
              className="
                text-[15px] font-medium text-[#333333]
                sm:text-[16px]
              "
            >
              Add photos or videos
            </p>

            <p
              className="
                mt-[3px]
                text-[12px] leading-[150%] text-[#999999]
                sm:text-[13px]
              "
            >
              You can attach images or video files to your
              review.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleMediaChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="
                mt-[12px]
                flex min-h-[44px] w-full
                items-center justify-center gap-[8px]
                rounded-[20px]
                border-2 border-[#7C9BC0]
                bg-white
                px-[22px]
                text-[14px] font-medium text-[#7C9BC0]
                transition-all duration-200 ease-out
                hover:-translate-y-[2px]
                hover:bg-[#7C9BC0]/10
                hover:shadow-[0_5px_12px_rgba(0,0,0,0.08)]
                active:translate-y-0
                active:scale-[0.97]
                sm:w-fit
                sm:text-[15px]
              "
            >
              <span className="text-[22px] font-light leading-none">
                +
              </span>

              <span>Add media</span>
            </button>

            {/* Selected media */}
            {mediaFiles.length > 0 && (
              <div className="mt-[14px] flex flex-wrap gap-[8px]">
                {mediaFiles.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="
                      flex max-w-full items-center gap-[8px]
                      rounded-[16px]
                      border border-[#E5E5E5]
                      bg-white
                      px-[12px] py-[7px]
                      text-[12px] text-[#555555]
                      sm:rounded-full
                      sm:px-[14px]
                      sm:text-[13px]
                    "
                  >
                    <span className="max-w-[190px] truncate sm:max-w-[260px]">
                      {file.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      aria-label={`Remove ${file.name}`}
                      className="
                        shrink-0
                        text-[18px] leading-none text-[#999999]
                        transition-all duration-150
                        hover:rotate-90
                        hover:text-[#DE3A3A]
                      "
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div
            className="
              mt-[24px]
              flex w-full justify-stretch
              sm:mt-[26px]
              sm:justify-end
            "
          >
            <button
              type="submit"
              disabled={
                rating === 0 || !reviewText.trim()
              }
              className="
                flex min-h-[48px] w-full
                items-center justify-center
                rounded-full
                bg-[#7C9BC0]
                px-[30px]
                text-[16px] font-medium text-white
                shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                transition-all duration-200 ease-out
                hover:-translate-y-[2px]
                hover:bg-[#6D8FB7]
                hover:shadow-[0_7px_16px_rgba(124,155,192,0.25)]
                active:translate-y-0
                active:scale-[0.97]
                disabled:pointer-events-none
                disabled:opacity-40
                sm:w-auto
                sm:min-w-[170px]
                sm:text-[17px]
              "
            >
              Submit review
            </button>
          </div>
        </form>
      </div>

      {/* Reviews header */}
      <div
        className="
          mb-[32px]
          flex w-full flex-col items-start gap-[14px]
          sm:mb-[47px]
          lg:flex-row lg:items-center
        "
      >
        <h2
          className="
            text-[21px] font-semibold leading-[130%] text-[#333333]
            sm:text-2xl
            lg:mr-[29px]
          "
        >
          Top reviews from the United States
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-[10px] sm:gap-[16px]">
          <button
            type="button"
            className="
              min-h-[28px]
              rounded-[20px]
              bg-[#F8F8F8]
              px-[14px]
              text-[12px] text-[#7C9BC0]
              shadow-[0_2px_4px_#00000033]
              transition-all duration-200
              hover:-translate-y-[1px]
              sm:px-4 sm:text-sm
            "
          >
            Top reviews
          </button>

          <button
            type="button"
            className="
              min-h-[28px]
              rounded-[20px]
              bg-[#F8F8F8]
              px-[14px]
              text-[12px] text-[#B3B3B3]
              shadow-[0_2px_4px_#00000033]
              transition-all duration-200
              hover:-translate-y-[1px]
              sm:px-4 sm:text-sm
            "
          >
            Most recent
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="flex flex-col gap-[48px]">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
          />
        ))}
      </div>
    </section>
  );
};

const ReviewCard = ({
  review,
}: ReviewCardProps) => {
  return (
    <article
      className="
        flex w-full flex-col gap-[16px]
        sm:gap-[20px]
      "
    >
      {/* User */}
      <div className="flex flex-wrap items-center gap-[8px] sm:gap-[10px]">
        {/* Avatar */}
        <div
          className="
            flex h-[44px] w-[44px] shrink-0
            items-center justify-center
            rounded-full
            bg-[linear-gradient(144.29deg,#5ACEFF_-0.18%,#FF9F5A_101.85%)]
            p-[3px]
            sm:h-[50px] sm:w-[50px]
          "
        >
          <div className="flex h-full w-full items-center justify-center rounded-full border border-[#F8F8F8] bg-white">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5238 11.5238C16.1548 11.5238 18.2857 9.39286 18.2857 6.7619C18.2857 4.13095 16.1548 2 13.5238 2C10.8929 2 8.7619 4.13095 8.7619 6.7619C8.7619 9.39286 10.8929 11.5238 13.5238 11.5238ZM13.5238 13.9048C10.3452 13.9048 4 15.5 4 18.6667V21.0476H23.0476V18.6667C23.0476 15.5 16.7024 13.9048 13.5238 13.9048Z"
                fill="#828282"
              />
            </svg>
          </div>
        </div>

        {/* Name */}
        <span
          className="
            rounded-[20px]
            bg-[#F8F8F8]
            px-[14px] py-[5px]
            text-[12px] text-[#E9852A]
            shadow-[0_2px_4px_#00000033]
            sm:px-4 sm:text-sm
          "
        >
          {review.userName}
        </span>

        {/* Date */}
        <span className="text-[12px] text-[#828282] sm:text-sm">
          on {review.date}
        </span>
      </div>

      {/* Rating and title */}
      <div
        className="
          flex flex-col items-start gap-[8px]
          sm:flex-row sm:items-center sm:gap-[16px]
        "
      >
        <div className="flex shrink-0 items-center gap-[5px]">
          {Array.from(
            { length: 5 },
            (_, index) => {
              const isFilled =
                index < review.rating;

              return (
                <Image
                  key={index}
                  src={
                    isFilled
                      ? "/common/star_filled.svg"
                      : "/common/star_empty.svg"
                  }
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden="true"
                  className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]"
                />
              );
            },
          )}
        </div>

        <h3
          className="
            break-words
            text-[16px] font-medium leading-[130%] text-[#333333]
            sm:text-lg
          "
        >
          {review.title}
        </h3>
      </div>

      {/* Verified */}
      {review.isVerifiedPurchase && (
        <span className="text-[13px] font-medium text-[#E9852A] sm:text-[14px]">
          Verified Purchase
        </span>
      )}

      {/* Review content */}
      <div
        className="
          flex w-full flex-col gap-[16px]
          lg:flex-row lg:items-start lg:gap-[24px]
        "
      >
        {review.imageUrl && (
          <div className="w-full shrink-0 lg:w-[40%] lg:max-w-[550px]">
            <Image
              src={review.imageUrl}
              width={550}
              height={550}
              alt={review.title}
              className="
                h-auto w-full
                rounded-[16px]
                object-cover
                sm:rounded-[20px]
              "
            />
          </div>
        )}

        <p
          className="
            min-w-0 flex-1
            whitespace-pre-line break-words
            text-[14px] leading-[150%] text-[#333333]
            sm:text-[16px]
          "
        >
          {review.comment}
        </p>
      </div>

      {/* Media names */}
      {review.mediaNames &&
        review.mediaNames.length > 0 && (
          <div className="flex flex-wrap gap-[8px]">
            {review.mediaNames.map((name, index) => (
              <span
                key={`${name}-${index}`}
                className="
                  max-w-full truncate
                  rounded-[16px]
                  bg-[#F8F8F8]
                  px-[12px] py-[7px]
                  text-[12px] text-[#777777]
                  sm:rounded-full
                  sm:px-[14px]
                  sm:text-[13px]
                "
              >
                {name}
              </span>
            ))}
          </div>
        )}

      {/* Helpful count */}
      <span className="text-[13px] text-[#555555] sm:text-[14px]">
        953 people found this helpful
      </span>

      {/* Actions */}
      <div
        className="
          flex w-full flex-col gap-[10px]
          sm:w-auto sm:flex-row sm:flex-wrap sm:gap-[20px]
        "
      >
        <button
          type="button"
          className="
            min-h-[44px] w-full
            rounded-full
            bg-[#7C9BC0]
            px-[28px] py-[10px]
            text-[16px] font-medium text-white
            shadow-[0_2px_4px_#00000033]
            transition-all duration-200 ease-out
            hover:-translate-y-[2px]
            hover:bg-[#6D8FB7]
            hover:shadow-[0_6px_14px_rgba(124,155,192,0.24)]
            active:translate-y-0
            active:scale-[0.97]
            sm:w-auto
            sm:text-lg
          "
        >
          Helpful
        </button>

        <button
          type="button"
          className="
            min-h-[44px] w-full
            rounded-full
            border-[3px] border-[#7C9BC0]
            bg-white
            px-[24px] py-[8px]
            text-[16px] text-[#7C9BC0]
            transition-all duration-200 ease-out
            hover:-translate-y-[2px]
            hover:bg-[#7C9BC0]/10
            hover:shadow-[0_5px_12px_rgba(0,0,0,0.08)]
            active:translate-y-0
            active:scale-[0.97]
            sm:w-auto
            sm:text-lg
          "
        >
          Report abuse
        </button>
      </div>
    </article>
  );
};

export default ProductReviewsSection;