import { cn } from "@/lib/utils";

type Props = {
  title: string;
  titleClassName?: string;
  subtitle?: string;
  subtitleClassName?: string;
};

export default function SubHeading({
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
}: Props) {
  return (
    <div className="flex flex-col gap-y-1.5">
      <h1 className={cn("text-lg font-medium", titleClassName)}>{title}</h1>
      <h4 className={cn("text-base text-muted-foreground", subtitleClassName)}>
        {subtitle}
      </h4>
    </div>
  );
}
