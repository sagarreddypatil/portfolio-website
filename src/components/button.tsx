import Link from "next/link";

export function OutlineButton({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <Link
      className={`flex flex-row items-center justify-center align-middle rounded-none outline outline-2 outline-black dark:outline-white dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white text-normal px-4 h-6 me-[4px] shadow-[3px_3px_0px_1px_rgba(0,0,0,0.5)] dark:shadow-[3px_3px_0px_1px_rgba(255,255,255,0.6)] ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}
