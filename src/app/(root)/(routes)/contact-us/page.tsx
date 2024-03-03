import Link from "next/link";
import { supportEmail } from "@/constant";
import { ArrowRightIcon } from "lucide-react";
import Wrapper from "@/components/ui/wrapper";
import ContactForm from "@/components/contact-form";
import { buttonVariants } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <Wrapper className="mb-4 sm:mb-14 sm:mt-10">
      <section className="flex flex-col gap-y-3 p-2 sm:flex-row sm:gap-x-5">
        <div className="flex-1 space-y-3 sm:space-y-5">
          <h1 className="text-2xl tracking-wider sm:text-3xl md:text-5xl">
            Contact us
          </h1>
          <h4 className="text-base text-muted-foreground sm:text-lg">
            Use the contact form to get in touch or email us at{" "}
            <Link
              href={`mailto:${supportEmail.toLowerCase()}`}
              className="font-medium text-primary"
            >
              {supportEmail.toLowerCase()}.
            </Link>
            We will get back to you ASP.
          </h4>

          <h4 className="text-base text-muted-foreground sm:text-lg">
            For any other inquiries, feel free to contact us anytime.
          </h4>

          <Link
            href="/"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Go to home
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="flex-1 rounded-2xl border-[1px] bg-slate-50 p-3 shadow sm:px-4 sm:py-6 md:p-8">
          <ContactForm />
        </div>
      </section>
    </Wrapper>
  );
}
