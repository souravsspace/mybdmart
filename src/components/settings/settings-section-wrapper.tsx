import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

type Props = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
};

export default function SettingsSectionWrapper({
  children,
  title,
  subtitle,
}: Props) {
  return (
    <section className="mb-4 px-2 sm:px-6">
      <div className="hidden sm:block">
        <Heading title={title} subtitle={subtitle} isSettingsPage={true} />
        <Separator className="my-4 sm:my-6" />
      </div>

      <div>{children}</div>
    </section>
  );
}
