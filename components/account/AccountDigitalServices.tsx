import Link from "next/link";

const supportItems = [
  {
    title: "Manage digital content",
    description:
      "View and manage digital purchases, subscriptions, and connected content.",
    href: "/account/digital-services/content",
  },
  {
    title: "Device support",
    description:
      "Get help with devices connected to your TreeMiix account.",
    href: "/account/digital-services/devices",
  },
  {
    title: "Contact support",
    description:
      "Get additional help if your issue is not covered by the available options.",
    href: "/customer-service/contact",
  },
];

export default function AccountDigitalServices() {
  return (
    <section className="w-full">
      {/* Title */}
      <h1 className="mb-[18px] text-[28px] font-medium leading-[130%] text-[#333333]">
        Digital Services and Device Support
      </h1>

      {/* Support panel */}
      <div className="rounded-[20px] bg-[#F8F8F8] px-[36px] py-[34px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
        <p className="max-w-[800px] text-[14px] font-normal leading-[150%] text-[#555555]">
          Manage your digital services, connected devices, and support options
          from one place.
        </p>

        {/* Support options */}
        <div className="mt-[28px] flex flex-col gap-[14px]">
          {supportItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center justify-between rounded-[14px] bg-white px-[22px] py-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-colors hover:bg-[#F1F1F1]"
            >
              <div>
                <h2 className="text-[16px] font-medium leading-[130%] text-[#333333]">
                  {item.title}
                </h2>

                <p className="mt-[4px] text-[13px] font-normal leading-[150%] text-[#777777]">
                  {item.description}
                </p>
              </div>

              <span className="ml-[20px] text-[22px] text-[#7C9BC0]">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}