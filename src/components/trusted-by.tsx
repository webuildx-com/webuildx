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

const logoClassName =
  "h-[22px] w-auto max-w-[88px] object-contain opacity-45 brightness-0 sm:h-[22px] sm:max-w-[88px] lg:h-6 lg:max-w-[120px]";

export function TrustedBy() {
  return (
    <div
      aria-label="Trusted by"
      className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 lg:gap-10"
    >
      <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle sm:text-[12px]">
        Trusted by:
      </p>

      {/* Mobile: 3 logos, then 2 centered */}
      <ul className="grid w-full grid-cols-6 items-center gap-x-2 gap-y-5 sm:hidden">
        {clients.slice(0, 3).map(({ id, name, src, width, height }) => (
          <li key={id} className="col-span-2 flex justify-center">
            <Image
              src={src}
              alt={name}
              width={width}
              height={height}
              className={logoClassName}
              sizes="88px"
            />
          </li>
        ))}
        {clients.slice(3).map(({ id, name, src, width, height }, index) => (
          <li
            key={id}
            className={`col-span-2 flex justify-center ${
              index === 0 ? "col-start-2" : "col-start-4"
            }`}
          >
            <Image
              src={src}
              alt={name}
              width={width}
              height={height}
              className={logoClassName}
              sizes="88px"
            />
          </li>
        ))}
      </ul>

      {/* Tablet + desktop: single row */}
      <ul className="hidden flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-4 sm:flex lg:gap-x-6">
        {clients.map(({ id, name, src, width, height }) => (
          <li key={id} className="flex shrink-0 items-center justify-center">
            <Image
              src={src}
              alt={name}
              width={width}
              height={height}
              className={logoClassName}
              sizes="120px"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
