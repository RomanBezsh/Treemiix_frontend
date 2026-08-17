import AccountProfileCard from "@/components/account/AccountProfileCard";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full bg-white font-[var(--font-roboto)]">
      <div className="mx-auto w-full max-w-[1600px] px-[16px] pb-[70px] pt-[24px] sm:px-[24px] lg:px-[40px] lg:pb-[90px] lg:pt-[50px]">
        {/* Account layout */}
        <div className="flex flex-col gap-[28px] lg:flex-row lg:items-start lg:gap-[40px] xl:gap-[70px]">
          {/* Left column */}
          <div className="flex w-full shrink-0 flex-col gap-[20px] lg:w-[300px] xl:w-[360px] 2xl:w-[400px]">
            <AccountProfileCard />
            <AccountSidebar />
          </div>

          {/* Account content */}
          <div className="min-w-0 w-full flex-1">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}