import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { SellerTask } from "@/data/sellerDashboardData";

const toneStyles: Record<SellerTask["tone"], { icon: typeof Info; className: string }> = {
  warning: { icon: AlertTriangle, className: "bg-[#FFF4E5] text-[#FF825A]" },
  info: { icon: Info, className: "bg-[#EEF2FA] text-[#6A7DBE]" },
  success: { icon: CheckCircle2, className: "bg-emerald-50 text-emerald-600" },
};

interface SellerTasksProps {
  tasks: SellerTask[];
}

export default function SellerTasks({ tasks }: SellerTasksProps) {
  return (
    <div className="flex h-full flex-col rounded-[20px] bg-[#F8F8F8] p-[20px] shadow-[0_2px_5px_rgba(0,0,0,0.08)] lg:p-[28px]">
      <h2 className="text-[20px] font-medium leading-[130%] text-[#333333] lg:text-[22px]">
        Action items
      </h2>

      <ul className="mt-[18px] flex flex-col gap-[12px]">
        {tasks.map((task) => {
          const { icon: Icon, className } = toneStyles[task.tone];

          return (
            <li
              key={task.id}
              className="flex items-start gap-[12px] rounded-[14px] bg-white p-[14px] transition-transform duration-200 ease-out hover:translate-x-[4px]"
            >
              <span className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] ${className}`}>
                <Icon size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-medium leading-[130%] text-[#333333]">{task.title}</p>
                <p className="mt-[4px] text-[13px] leading-[145%] text-[#777777]">{task.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
