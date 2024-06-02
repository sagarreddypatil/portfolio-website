export default function Article({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`prose md:prose-lg lg:prose-xl max-w-none prose-neutral dark:prose-invert ${className}`}
    >
      {children}
    </article>
  );
}
