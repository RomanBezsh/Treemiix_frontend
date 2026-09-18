"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import Link from "next/link";
import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://treemiix-backend.onrender.com/api";

export default function CustomerServiceTopicPage() {
  const { category: categorySlug, topic: topicSlug } = useParams();

  const [category, setCategory] = useState<any>({});
  const [topic, setTopic] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categorySlug || !topicSlug) return;
    fetch(`${API_BASE_URL}/customer-service/${categorySlug}/${topicSlug}`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data.category || {});
        setTopic(data.topic || {});
      })
      .catch(() => {
        setCategory({ title: categorySlug });
        setTopic({ title: topicSlug });
      })
      .finally(() => setLoading(false));
  }, [categorySlug, topicSlug]);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  const renderDescription = () => {
    if (!topic.description) return null;
    if (Array.isArray(topic.description)) {
      return topic.description.map((paragraph: string, index: number) => (
        <p key={index} className="max-w-[920px] text-[18px] font-normal leading-[130%] text-[#333333]">
          {paragraph}
        </p>
      ));
    }
    return <p className="max-w-[920px] text-[18px] font-normal leading-[130%] text-[#333333]">{topic.description}</p>;
  };

  return (
    <main className="w-full bg-white font-[var(--font-roboto)]">
      <div className="mx-auto w-full max-w-[1120px] px-[24px] pb-[80px] pt-[32px]">
        <Breadcrumbs
          items={[
            {
              title: "Customer Service",
              href: "/customer-service",
            },
            {
              title: category.title || categorySlug,
              href: `/customer-service/${categorySlug}`,
            },
            {
              title: topic.title || topicSlug,
            },
          ]}
        />

        <section className="mt-[32px] flex items-center gap-[24px]">
          <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[10px] bg-[#EFEFEF33]">
            <Image
              src="/common/help_icon.svg"
              alt=""
              width={42}
              height={42}
              aria-hidden="true"
              className="h-[42px] w-[42px] object-contain"
            />
          </div>

          <h1 className="text-[32px] font-medium leading-[130%] text-[#222222]">
            {category.title || categorySlug}
          </h1>
        </section>

        <article className="mt-[36px] rounded-[18px] bg-[#F8F8F8] px-[40px] pb-[36px] pt-[32px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
          <h2 className="text-[22px] font-medium leading-[130%] text-[#222222]">
            {topic.title || topicSlug}
          </h2>

          {renderDescription()}

          {topic.bulletPoints && topic.bulletPoints.length > 0 && (
            <ul className="mt-[16px] max-w-[920px] list-disc space-y-[4px] pl-[24px]">
              {topic.bulletPoints.map((bulletPoint: string, index: number) => (
                <li key={index} className="text-[18px] font-normal leading-[130%] text-[#333333]">
                  {bulletPoint}
                </li>
              ))}
            </ul>
          )}

          {topic.actions && topic.actions.length > 0 && (
            <div className="mt-[40px] flex flex-wrap gap-[34px]">
              {topic.actions.map((action: any) => (
                <Link
                  key={action.title}
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