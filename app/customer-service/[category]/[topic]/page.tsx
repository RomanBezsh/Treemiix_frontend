import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import {
  getCustomerServiceCategory,
  getCustomerServiceTopic,
} from "@/data/customerServiceData";

type CustomerServiceTopicPageProps = {
  params: Promise<{
    category: string;
    topic: string;
  }>;
};

export default async function CustomerServiceTopicPage({
  params,
}: CustomerServiceTopicPageProps) {
  const { category: categorySlug, topic: topicSlug } = await params;

  const category = getCustomerServiceCategory(categorySlug);
  const topic = getCustomerServiceTopic(categorySlug, topicSlug);

  if (!category || !topic) {
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
              href: `/customer-service/${category.slug}`,
            },
            {
              title: topic.title,
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

        {/* Topic details */}
        <article className="mt-[36px] rounded-[18px] bg-[#F8F8F8] px-[40px] pb-[36px] pt-[32px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
          {/* Topic title */}
          <h2 className="text-[22px] font-medium leading-[130%] text-[#222222]">
            {topic.title}
          </h2>

          {/* Topic description */}
          {topic.description && topic.description.length > 0 && (
            <div className="mt-[24px] flex flex-col gap-[16px]">
              {topic.description.map((paragraph, index) => (
                <p
                  key={`${topic.slug}-description-${index}`}
                  className="max-w-[920px] text-[18px] font-normal leading-[130%] text-[#333333]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Bullet points */}
          {topic.bulletPoints && topic.bulletPoints.length > 0 && (
            <ul className="mt-[16px] max-w-[920px] list-disc space-y-[4px] pl-[24px]">
              {topic.bulletPoints.map((bulletPoint, index) => (
                <li
                  key={`${topic.slug}-bullet-${index}`}
                  className="text-[18px] font-normal leading-[130%] text-[#333333]"
                >
                  {bulletPoint}
                </li>
              ))}
            </ul>
          )}

          {/* Actions */}
          {topic.actions && topic.actions.length > 0 && (
            <div className="mt-[40px] flex flex-wrap gap-[34px]">
              {topic.actions.map((action) => (
                <Link
                  key={`${topic.slug}-${action.title}`}
                  href={action.href}
                  className="flex min-h-[48px] min-w-[240px] items-center justify-center rounded-[24px] bg-[#7C9BC0] px-[28px] py-[10px] text-center text-[16px] font-medium leading-[130%] text-white"
                >
                  {action.title}
                </Link>
              ))}
            </div>
          )}
        </article>
      </div>
    </main>
  );
}