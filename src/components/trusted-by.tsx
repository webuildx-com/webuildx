import Image from "next/image";

const clients = [
  {
    id: "knoxxpay",
    name: "KnoxxPay",
    src: "/clients/knoxxpay.png",
    width: 106,
    height: 40,
  },
  {
    id: "orange-farm",
    name: "Orange Farm",
    src: "/clients/orange-farm.png",
    width: 120,
    height: 37,
  },
  {
    id: "creditveto",
    name: "CreditVeto",
    src: "/clients/creditveto.png",
    width: 240,
    height: 56,
  },
  {
    id: "klerra",
    name: "Klerra",
    src: "/clients/klerra.png",
    width: 240,
    height: 68,
  },
  {
    id: "landlordcare",
    name: "LandLordCare",
    src: "/clients/landlordcare.png",
    width: 240,
    height: 65,
  },
] as const;

export function TrustedBy() {
  return (
    <div
      aria-label="Trusted by"
      className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-8 lg:gap-10"
    >
      <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle sm:text-[12px]">
        Trusted by:
      </p>

      <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:flex-1 sm:justify-between sm:gap-x-4 sm:gap-y-4 lg:gap-x-6">
        {clients.map(({ id, name, src, width, height }) => (
          <li key={id} className="flex shrink-0 items-center justify-center">
            <Image
              src={src}
              alt={name}
              width={width}
              height={height}
              className="h-5 w-auto max-w-[72px] object-contain opacity-45 brightness-0 sm:h-[22px] sm:max-w-[88px] lg:h-6 lg:max-w-[120px]"
              sizes="120px"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
