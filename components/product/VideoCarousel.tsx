import Image from "next/image";
import Link from "next/link";



const VideoCarousel = () => {
    return (
        <div className="flex flex-col items-center w-[1880px]">
            <h2 className="text-[#333333] font-semibold text-2xl mb-16.75 w-[1690px]">
                Videos
            </h2>
            
            <div className="flex flex-row justify-between items-center mb-3.75">
                <button
                    type="button"
                    aria-label="Previous product"
                    className="flex justify-center items-center -left-4.75  border-0 w-19 h-19 shadow-[0_2px_4px_#00000033] rounded-[20px]"
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
                {
                    Array.from({length: 5}, (_, index) => {
                        return(
                            <VideoCard title="Customer Review: Definitely WORTH IT!!!" chanel="Kendratiy" duration="4:55" />
                        )                        
                    })
                }
                </div>
                
                

                <button
                    type="button"
                    aria-label="Next product"
                    className=" flex justify-center items-center -right-4.75 border-0 w-19 h-19 shadow-[0_2px_4px_0px_#00000033] rounded-[20px]"
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
                    <div className="w-42.5 h-2.5 bg-[#D6D6D6] rounded-[20px] shadow-[0_2px_4px_#00000033]"></div>
                    <div className="w-42.5 h-2.5 bg-[#EFEFEF] rounded-[20px] shadow-[0_2px_4px_#00000033]"></div>
                    <div className="w-42.5 h-2.5 bg-[#EFEFEF] rounded-[20px] shadow-[0_2px_4px_#00000033]"></div>
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
        <span className="absolute flex justify-center items-center bg-[#828282] w-14 h-6.5 opacity-80 rounded-[10px] text-[#FFFFFF] text-sm font-medium shadow-[0px_2px_4px_#00000033] bottom-2.5 right-3.5 z-10">
          {duration}
        </span>
      </div>

      <div className="flex flex-col flex-1 pt-3.5 px-3.5 pb-4">
        <h2 className="text-[#000000] text-lg mb-3 line-clamp-1">{title}</h2>
        <span className="mt-auto flex justify-center items-center bg-[#F8F8F8] text-[#333333] w-27 h-8.5 rounded-[20px] shadow-[0px_2px_4px_#00000033]">
          {chanel}
        </span>
      </div>

    </div>
  );
};

export default VideoCarousel;