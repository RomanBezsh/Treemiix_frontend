import Image from "next/image";
import { useState } from "react";

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

const VideoCarousel = ({ videos }: VideoCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalVideos = videos.length > 0 ? videos.length : 5;
    const cardsToShow = 4;
    const maxIndex = Math.max(0, totalVideos - cardsToShow);

    const nextSlide = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(Math.min(index, maxIndex));
    };

    const displayVideos = Array.isArray(videos) && videos.length > 0 && typeof videos[0] === 'object' ? videos : Array.from({length: 5}, (_, i) => ({
        id: i.toString(),
        title: "Customer Review: Definitely WORTH IT!!!",
        channelTitle: "Kendratiy",
        thumbnail: "",
        url: "",
        duration: "4:55"
    }));

    return (
        <div className="flex flex-col items-center w-[1880px] mb-37">
            <h2 className="text-[#333333] font-semibold text-2xl mb-16.75 w-[1690px]">
                Videos
            </h2>
            
            <div className="flex flex-row justify-between items-center mb-3.75">
                <button
                    type="button"
                    aria-label="Previous product"
                    onClick={prevSlide}
                    disabled={currentIndex === 0}
                    className="flex justify-center items-center -left-4.75 border-0 w-19 h-19 shadow-[0_2px_4px_#00000033] rounded-[20px] disabled:opacity-50"
                >
                    <Image
                        src="/home/carousel_chewron.svg"
                        alt="carousel_chewron"
                        width={17 * 2}
                        height={37 * 2}
                        className="rotate-180"
                    />
                </button>
                
                <div className="flex flex-row gap-5 w-[1690px] overflow-hidden">
                    <div 
                        className="flex flex-row gap-5 transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * (360 + 20)}px)` }}
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
                
                <button
                    type="button"
                    aria-label="Next product"
                    onClick={nextSlide}
                    disabled={currentIndex === maxIndex}
                    className=" flex justify-center items-center -right-4.75 border-0 w-19 h-19 shadow-[0_2px_4px_0px_#00000033] rounded-[20px] disabled:opacity-50"
                >
                    <Image
                        src="/home/carousel_chewron.svg"
                        alt="carousel_chewron"
                        width={17 * 2}
                        height={37 * 2}
                    />
                </button>
            </div >
            <div className="flex flex-row items-end w-[1690px] justify-between">
                <button className="w-49.75 h-10.5 rounded-[20px] shadow-[0_2px_4px_#00000033] bg-[#7C9BC0] text-[#F8F8F8] text-lg font-medium self-start">
                    Upload your video
                </button>

                <div className="flex flex-row gap-5">
                    {[0, 1, 2].map((i) => (
                        <div 
                            key={i} 
                            onClick={() => goToSlide(i * 2)}
                            className={`w-42.5 h-2.5 rounded-[20px] shadow-[0_2px_4px_#00000033] cursor-pointer ${currentIndex === i * 2 ? 'bg-[#D6D6D6]' : 'bg-[#EFEFEF]'}`}></div>
                    ))}
                </div>
                <div className="w-49.75"></div>
            </div>
        </div>
    )
}

interface VideoCardProps {
  imageSrc?: string;
  duration?: string;
  title: string;
  chanel: string;
}

const VideoCard = ({ imageSrc, duration, title, chanel }: VideoCardProps) => {
  return (
    <div className="flex flex-col shrink-0 w-90 h-100.75 rounded-[20px] border-4 border-[#F8F8F8] shadow-[0px_2px_4px_#00000033] bg-white overflow-hidden">
      
      <div className="relative w-90 h-67 -mt-1 -ml-1">
        <Image
          src={
            imageSrc ||
            "https://storage.googleapis.com/support-forums-api/attachment/thread-186062532-7801378621266266762.jpg"
          }
          alt={title}
          fill
          className="object-cover"
        />
        {/* Время видео теперь в правом нижнем углу */}
        <span className="absolute flex justify-center items-center bg-[#828282] w-14 h-6.5 opacity-80 rounded-[10px] text-[#FFFFFF] text-sm font-medium shadow-[0px_2px_4px_#00000033] bottom-2.5 right-3.5 !left-auto z-10">
          {duration || "0:00"}
        </span>
      </div>

      <div className="flex flex-col flex-1 pt-3.5 px-3.5 pb-4">
        <h2 className="text-[#000000] text-lg mb-3 line-clamp-1">{title}</h2>
        {/* Название канала справа */}
        <div className="flex justify-end mt-auto">
            <span className="flex justify-center items-center bg-[#F8F8F8] text-[#333333] w-auto px-4 h-8.5 rounded-[20px] shadow-[0px_2px_4px_#00000033]">
                {chanel}
            </span>
        </div>
      </div>

    </div>
  );
};

export default VideoCarousel;
