import Image from "next/image";

const ProductSearchQuestions = () => {
    return (
        <div className="w-[1690px] mb-37">
            <h2 className="text-[#333333] font-semibold text-2xl mb-2.5">Have a question?</h2>
            <p className="text-[#828282] mb-6.75">Find answers in product info, Q&As, reviews</p>
            <div className="relative flex flex-row -pl-4">
                <Image 
                    className="absolute left-6 top-1/2 -translate-y-1/2"
                    src={"/product/loupe.svg"}
                    width={24}
                    height={23}
                    alt={"loupe"}
                />

                <input type="text"className="pl-[63px] w-[930px] text-lg h-[44px] bg-[#F8F8F8] rounded-[26px]" placeholder="Type your question or keyword"/>
            </div>
        </div>
    );
}


export default ProductSearchQuestions;