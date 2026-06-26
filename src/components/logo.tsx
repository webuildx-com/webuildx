import Image from "next/image";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "h-6 w-auto" }: LogoProps) {
  return (
    <Image
      src="/webuildx-logo.svg"
      alt="WebuildX"
      width={162}
      height={24}
      className={className}
      priority
    />
  );
}
