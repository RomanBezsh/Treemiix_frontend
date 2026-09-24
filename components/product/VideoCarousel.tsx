"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  url: string;
  duration: string;
}

interface VideoCarouselProps {
  videos: Video[];
}

const VideoCarousel = ({
  videos,
}: VideoCarouselProps) => {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [cardsToShow, setCardsToShow] =
    useState(1);

  const [slideStep, setSlideStep] =
    useState(0);

  const viewportRef =
    useRef<HTMLDivElement>(null);

  const trackRef =
    useRef<HTMLDivElement>(null);

  const displayVideos =
    Array.isArray(videos) &&
    videos.length > 0 &&
    typeof videos[0] === "object"
      ? videos
      : Array.from(
          { length: 5 },
          (_, index) => ({
            id: index.toString(),
            title:
              "Customer Review: Definitely WORTH IT!!!",
            channelTitle: "Kendratiy",
            thumbnail: "",
            url: "",
            duration: "4:55",
          }),
        );

  const totalVideos = displayVideos.length;

  const maxIndex = Math.max(
    0,
    totalVideos - cardsToShow,
  );

  useEffect(() => {
    const calculateSizes = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;

      if (!viewport || !track) {
        return;
      }

      const firstCard =
        track.firstElementChild as HTMLElement | null;

      if (!firstCard) {
        return;
      }

      const cardWidth =
        firstCard.getBoundingClientRect().width;

      const trackStyles =
        window.getComputedStyle(track);

      const gap =
        parseFloat(trackStyles.columnGap) || 0;

      const step = cardWidth + gap;

      const visibleCards = Math.max(
        1,
        Math.floor(
          (viewport.clientWidth + gap) / step,
        ),
      );

      setSlideStep(step);
      setCardsToShow(visibleCards);
    };

    calculateSizes();

    const observer = new ResizeObserver(
      calculateSizes,
    );

    if (viewportRef.current) {
      observer.observe(viewportRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [totalVideos]);

  useEffect(() => {
    setCurrentIndex((current) =>
      Math.min(current, maxIndex),
    );
  }, [maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((current) =>
      Math.min(current + 1, maxIndex),
    );
  };

  const prevSlide = () => {
    setCurrentIndex((current) =>
      Math.max(current - 1, 0),
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(
      Math.min(index, maxIndex),
    );
  };

  const pageStarts = Array.from(
    {
      length: Math.max(
        1,
        Math.ceil(
          totalVideos /
            Math.max(cardsToShow, 1),
        ),
      ),
    },
    (_, index) =>
      Math.min(
        index * cardsToShow,
        maxIndex,
      ),
  ).filter(
    (value, index, array) =>
      array.indexOf(value) === index,
  );

  return (
    <section
      className="
        mb-[70px] flex w-full max-w-[1880px]
        flex-col items-center
        px-[8px]
        sm:px-[16px]
        lg:mb-[148px]
      "
    >
      {/* Title */}
      <h2
        className="
          mb-[28px] w-full max-w-[1690px]
          px-[8px]
          text-[21px] font-semibold text-[#333333]
          sm:px-[8px]
          sm:text-2xl
          lg:mb-[67px]
          lg:px-[40px]
        "
      >
        Videos
      </h2>

      {/* Carousel */}
      <div className="relative w-full">
        {/* Previous */}
        <button
          type="button"
          aria-label="Previous product"
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="
            absolute left-0 top-1/2 z-20
            flex h-[40px] w-[40px]
            -translate-y-1/2
            items-center justify-center
            rounded-[12px]
            bg-white
            shadow-[0_2px_4px_#00000033]
            transition-all duration-200
            hover:scale-105
            disabled:pointer-events-none
            disabled:opacity-40
            sm:h-[52px] sm:w-[52px]
            sm:rounded-[16px]
            lg:h-[76px] lg:w-[76px]
            lg:rounded-[20px]
          "
        >
          <Image
            src="/home/carousel_chewron.svg"
            alt=""
            width={34}
            height={74}
            aria-hidden="true"
            className="
              h-[23px] w-auto rotate-180
              sm:h-[30px]
              lg:h-[37px]
            "
          />
        </button>

        {/* Viewport */}
        <div
          ref={viewportRef}
          className="
            mx-[46px] overflow-hidden
            sm:mx-[62px]
            lg:mx-[90px]
          "
        >
          <div
            ref={trackRef}
            className="
              flex gap-[12px]
              transition-transform duration-500 ease-in-out
              sm:gap-[16px]
              lg:gap-[20px]
            "
            style={{
              transform: `translateX(-${
                currentIndex * slideStep
              }px)`,
            }}
          >
            {displayVideos.map((video) => (
              <VideoCard
                key={video.id}
                title={video.title}
                chanel={video.channelTitle}
                imageSrc={video.thumbnail}
                duration={video.duration}
              />
            ))}
          </div>
        </div>

        {/* Next */}
        <button
          type="button"
          aria-label="Next product"
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
          className="
            absolute right-0 top-1/2 z-20
            flex h-[40px] w-[40px]
            -translate-y-1/2
            items-center justify-center
            rounded-[12px]
            bg-white
            shadow-[0_2px_4px_#00000033]
            transition-all duration-200
            hover:scale-105
            disabled:pointer-events-none
            disabled:opacity-40
            sm:h-[52px] sm:w-[52px]
            sm:rounded-[16px]
            lg:h-[76px] lg:w-[76px]
            lg:rounded-[20px]
          "
        >
          <Image
            src="/home/carousel_chewron.svg"
            alt=""
            width={34}
            height={74}
            aria-hidden="true"
            className="
              h-[23px] w-auto
              sm:h-[30px]
              lg:h-[37px]
            "
          />
        </button>
      </div>

      {/* Bottom controls */}
      <div
        className="
          mt-[18px] grid w-full max-w-[1690px]
          grid-cols-1 items-center gap-[18px]
          px-[8px]
          lg:grid-cols-[200px_1fr_200px]
          lg:px-[40px]
        "
      >
        <button
          type="button"
          className="
            min-h-[42px] w-full
            rounded-[20px]
            bg-[#7C9BC0]
            px-[18px]
            text-[15px] font-medium text-[#F8F8F8]
            shadow-[0_2px_4px_#00000033]
            transition-all duration-200
            hover:-translate-y-[2px]
            hover:shadow-[0_6px_14px_rgba(124,155,192,0.25)]
            active:translate-y-0
            active:scale-[0.98]
            sm:w-fit
            sm:min-w-[199px]
            sm:text-lg
          "
        >
          Upload your video
        </button>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-center gap-[8px] sm:gap-[12px] lg:gap-[20px]">
          {pageStarts.map(
            (startIndex, index) => (
              <button
                key={`${startIndex}-${index}`}
                type="button"
                aria-label={`Go to video page ${index + 1}`}
                onClick={() =>
                  goToSlide(startIndex)
                }
                className={`
                  h-[8px] w-[38px]
                  rounded-[20px]
                  shadow-[0_2px_4px_#00000033]
                  transition-all duration-200
                  sm:w-[70px]
                  lg:h-[10px]
                  lg:w-[120px]
                  xl:w-[170px]
                  ${
                    currentIndex ===
                    startIndex
                      ? "bg-[#D6D6D6]"
                      : "bg-[#EFEFEF]"
                  }
                `}
              />
            ),
          )}
        </div>

        <div className="hidden lg:block" />
      </div>
    </section>
  );
};

interface VideoCardProps {
  imageSrc?: string;
  duration?: string;
  title: string;
  chanel: string;
}

const VideoCard = ({
  imageSrc,
  duration,
  title,
  chanel,
}: VideoCardProps) => {
  return (
    <article
      className="
        group flex h-[330px] w-[220px] shrink-0
        flex-col overflow-hidden
        rounded-[16px]
        border-[3px] border-[#F8F8F8]
        bg-white
        shadow-[0_2px_4px_#00000033]
        transition-all duration-300
        hover:-translate-y-[4px]
        hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)]
        min-[380px]:w-[260px]
        sm:h-[370px]
        sm:w-[300px]
        sm:rounded-[20px]
        lg:h-[403px]
        lg:w-[340px]
        xl:w-[360px]
      "
    >
      {/* Thumbnail */}
      <div className="relative h-[180px] w-full sm:h-[220px] lg:h-[268px]">
        <Image
          src={
            imageSrc ||
            "https://storage.googleapis.com/support-forums-api/attachment/thread-186062532-7801378621266266762.jpg"
          }
          alt={title}
          fill
          className="
            object-cover
            transition-transform duration-300
            group-hover:scale-[1.025]
          "
        />

        <span
          className="
            absolute bottom-[10px] right-[12px] z-10
            flex min-w-[52px] items-center justify-center
            rounded-[10px]
            bg-[#828282]/80
            px-[8px] py-[4px]
            text-[12px] font-medium text-white
            shadow-[0_2px_4px_#00000033]
            sm:text-sm
          "
        >
          {duration || "0:00"}
        </span>
      </div>

      {/* Content */}
      <div className="flex min-h-0 flex-1 flex-col px-[12px] pb-[14px] pt-[12px] sm:px-[14px] sm:pb-[16px] sm:pt-[14px]">
        <h3 className="line-clamp-2 text-[15px] leading-[135%] text-black sm:text-lg">
          {title}
        </h3>

        <div className="mt-auto flex justify-end pt-[12px]">
          <span
            className="
              flex min-h-[32px] max-w-full
              items-center justify-center
              truncate
              rounded-[20px]
              bg-[#F8F8F8]
              px-[14px]
              text-[13px] text-[#333333]
              shadow-[0_2px_4px_#00000033]
              sm:min-h-[34px]
              sm:px-[16px]
              sm:text-[14px]
            "
          >
            {chanel}
          </span>
        </div>
      </div>
    </article>
  );
};

export default VideoCarousel;