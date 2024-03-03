import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ContactFormValidator } from "@/types/contact-form-validator";

export const ContactForm = createTRPCRouter({
  submitForm: publicProcedure
    .input(ContactFormValidator)
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName, phoneNumber, topic, email, message } = input;

      if (
        !firstName ||
        !lastName ||
        !phoneNumber ||
        !topic ||
        !email ||
        !message
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "All fields are required.",
        });
      }

      const updatedPhoneNumber = parseInt(phoneNumber.replace("+", ""));

      // TODO: Send email to the admin

      await ctx.db.contact.create({
        data: {
          firstName,
          lastName,
          phoneNumber: updatedPhoneNumber,
          email,
          topic,
          message,
        },
      });

      return {
        success: true,
      };
    }),

  getContactFormData: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user || ctx.session?.user.role === "USER") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not allowed to get mixed values!",
      });
    }

    const contactFormData = await ctx.db.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return contactFormData;
  }),
});
