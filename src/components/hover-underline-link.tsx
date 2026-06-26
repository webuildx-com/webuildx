import Link from "next/link";

type HoverUnderlineLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  underlineClassName?: string;
};

export function HoverUnderlineLink({
  href,
  children,
  className = "",
  underlineClassName = "bg-brand",
}: HoverUnderlineLinkProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-block cursor-pointer pb-0.5 transition-colors duration-300 ${className}`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:transition-none ${underlineClassName}`}
        aria-hidden="true"
      />
    </Link>
  );
}
