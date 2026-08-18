import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import { getCustomerServiceCategory } from "@/data/customerServiceData";

type CustomerServiceCategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CustomerServiceCategoryPage({
  params,
}: CustomerServiceCategoryPageProps) {
  const { category: categorySlug } = await params;

  const category = getCustomerServiceCategory(categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <main className="w-full bg-white font-[var(--font-roboto)]">
      <div className="mx-auto w-full max-w-[1120px] px-[24px] pb-[80px] pt-[32px]">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            {
              title: "Customer Service",
              href: "/customer-service",
            },
            {
              title: category.title,
            },
          ]}
        />

        {/* Category heading */}
        <section className="mt-[32px] flex items-center gap-[24px]">
          <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[10px] bg-[#EFEFEF33]">
            <Image
              src={category.icon}
              alt=""
              width={42}
              height={42}
              aria-hidden="true"
              className="h-[42px] w-[42px] object-contain"
            />
          </div>

          <h1 className="text-[32px] font-medium leading-[130%] text-[#222222]">
            {category.title}
          </h1>
        </section>

        {/* Topics */}
        <section className="mt-[36px] rounded-[18px] bg-[#F8F8F8] px-[28px] pb-[28px] pt-[24px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
          <h2 className="mb-[20px] text-[22px] font-medium leading-[130%] text-[#333333]">
            Pick what you need help with
          </h2>

          <div className="flex flex-col gap-[14px]">
            {category.topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/customer-service/${category.slug}/${topic.slug}`}
                className="group flex min-h-[58px] items-center justify-between rounded-[14px] border border-[#E3E3E3] bg-white px-[24px] py-[14px] shadow-[0_2px_4px_rgba(0,0,0,0.08)] transition-all duration-200 hover:border-transparent hover:bg-[linear-gradient(90deg,#7E8CBD_58%,#CE9AD7_100%)]"
              >
                <span className="text-[18px] font-medium leading-[130%] text-[#333333] transition-colors duration-200 group-hover:text-white">
                  {topic.title}
                </span>

                <Image
                  src="/common/arrow_right_icon.svg"
                  alt=""
                  width={10}
                  height={16}
                  aria-hidden="true"
                  className="transition duration-200 group-hover:brightness-0 group-hover:invert"
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}