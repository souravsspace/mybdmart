import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { DeliveryAddressFormValidation } from "@/types/settings-validators";

export const deliveryAddress = createTRPCRouter({
  getDeliveryAddress: publicProcedure.query(async ({ ctx }) => {
    const email = ctx.session?.user.email;

    if (!email || email == null) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    const user = await ctx.db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || user == null) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }

    const userDeliveryAddress = await ctx.db.deliveryAddress.findFirst({
      where: {
        userId: user.id,
      },
    });

    return {
      userDeliveryAddress,
    };
  }),

  postDeliveryAddress: publicProcedure
    .input(DeliveryAddressFormValidation)
    .mutation(async ({ input, ctx }) => {
      const {
        name,
        address,
        city,
        zip,
        insideDhaka,
        phoneNumber,
        email,
        googleMapLink,
        additionalInfo,
      } = input;

      if (!address || !city || !zip || !phoneNumber || !email || !name) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      const user = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
        });

      if (!user?.name || user?.name == null) {
        await ctx.db.user.update({
          where: {
            email,
          },
          data: {
            name,
          },
        });
      }

      const userDeliveryAddress = await ctx.db.deliveryAddress.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (userDeliveryAddress) {
        await ctx.db.deliveryAddress.update({
          where: {
            id: userDeliveryAddress.id,
          },
          data: {
            name,
            email,
            address,
            city,
            zip,
            insideDhaka: insideDhaka || false,
            phoneNumber,
            googleMapLink,
            additionalInfo,
            user: {
              connect: {
                email,
              },
            },
          },
        });
      }

      await ctx.db.deliveryAddress.create({
        data: {
          name,
          email,
          address,
          city,
          zip,
          insideDhaka: insideDhaka || false,
          phoneNumber,
          googleMapLink,
          additionalInfo,
          user: {
            connect: {
              email,
            },
          },
        },
      });

      return {
        success: true,
      };
    }),
});
