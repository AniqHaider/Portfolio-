/*
  A reveal marker. Renders fully visible by default; the deferred motion layer
  (Motion.tsx) animates it in on scroll when motion is allowed. No client JS here.
*/
export default function Reveal({
  children,
  delay = 0,
  className,
  mask = false,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  mask?: boolean;
  as?: React.ElementType;
}) {
  return (
    <Tag
      data-reveal={mask ? "mask" : "fade"}
      data-reveal-delay={delay || undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
