import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  isSettingsPage?: boolean;
};

export default function Heading({
  title,
  subtitle,
  isSettingsPage = false,
}: Props) {
  return (
    <div className="max-w-2xl lg:max-w-4xl ">
      {title ? (
        <h1
          className={cn(
            "text-gray-900",
            isSettingsPage
              ? "text-xl font-medium"
              : "px-0 text-2xl font-bold sm:px-4 sm:text-3xl lg:px-0",
          )}
        >
          {title}
        </h1>
      ) : null}
      {subtitle ? (
        <p
          className={cn(
            "text-muted-foreground",
            isSettingsPage ? "mt-1 text-sm" : "mt-2 text-base",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
