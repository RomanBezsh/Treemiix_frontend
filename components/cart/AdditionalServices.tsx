"use client";

type AdditionalService = {
  id: number;
  title: string;
  price: number;
};

type AdditionalServicesProps = {
  services: AdditionalService[];
  selectedServiceIds: number[];
  onToggleService: (serviceId: number) => void;
};

export default function AdditionalServices({
  services,
  selectedServiceIds,
  onToggleService,
}: AdditionalServicesProps) {
  return (
    <div className="cart-scale-in mt-[10px] flex max-w-[760px] flex-col gap-[12px]">
      {/* Additional service options */}
      {services.map((service) => {
        const isSelected = selectedServiceIds.includes(service.id);

        return (
          <label
            key={service.id}
            className="
              flex w-full cursor-pointer items-start justify-between gap-[24px]
              rounded-[8px] px-[6px] py-[4px]
              transition-all duration-200 ease-out
              hover:translate-x-[3px]
              hover:bg-white/60
            "
          >
            {/* Checkbox and service name */}
            <div className="flex min-w-0 flex-1 items-start gap-[10px]">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleService(service.id)}
                className="
                  mt-[5px] h-[14px] w-[14px] shrink-0
                  accent-[#7C9BC0]
                  transition-transform duration-200
                  hover:scale-[1.12]
                "
              />

              <span className="text-[16px] font-normal leading-[150%] text-[#333333]">
                {service.title}
              </span>
            </div>

            {/* Service price */}
            <p className="flex min-w-[55px] shrink-0 items-baseline justify-end gap-[4px] text-[#555555]">
              <span className="text-[14px] font-light leading-[120%]">
                $
              </span>

              <span className="text-right text-[22px] font-light leading-[120%]">
                {service.price}
              </span>
            </p>
          </label>
        );
      })}
    </div>
  );
}