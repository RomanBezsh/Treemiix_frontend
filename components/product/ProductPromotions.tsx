const ProductPromotions = () => {
    return (
        <div className="mb-37 w-[1690px]">
            <h2 className="text-[#333333] font-semibold text-2xl mb-10">Special offers and product promotions</h2>
            <div className="flex flex-row gap-3">
                <p>Create your FREE Business account to save up to 10% with Business-only prices and free shipping</p>
                <button className="w-30.5 h-7 rounded-[20px] text-sm text-[#496B94] bg-[#F8F8F8] shadow-[0px_2px_4px_#00000033] mb-4.5">Register today</button>
            </div>
            <div className="flex flex-row gap-3">
                <p>Your cost could be $49.99 instead of $99.99! Get a $50 Amazon Gift Card instantly upon approval for the Amazon Rewards Visa Card</p>
                <button className="w-30.5 h-7 rounded-[20px] text-sm text-[#496B94] bg-[#F8F8F8] shadow-[0px_2px_4px_#00000033]">Apply now</button>
            </div>
        </div>
    )
}

export default ProductPromotions;