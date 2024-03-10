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

    const userDeliveryAddress = await ctx.db.deliveryAddress.findUnique({
      where: {
        email,
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

      const user = ctx.session?.user;

      if (!user || user == null)
        throw new TRPCError({
          code: "NOT_FOUND",
        });

      const previousAddress = await ctx.db.deliveryAddress.findUnique({
        where: {
          email: user.email as string,
        },
      });

      if (!previousAddress || previousAddress == null) {
        await ctx.db.deliveryAddress.create({
          data: {
            name,
            email,
            address,
            city,
            zip,
            insideDhaka: insideDhaka ? true : false,
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
      }

      await ctx.db.deliveryAddress.update({
        where: {
          id: previousAddress?.id,
        },
        data: {
          name,
          email,
          address,
          city,
          zip,
          insideDhaka: insideDhaka,
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

  deliveryCharge: publicProcedure.query(async ({ ctx }) => {
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

    const userDeliveryAddress = await ctx.db.user.findUnique({
      where: {
        email,
      },
      include: {
        deliveryAddress: true,
      },
    });

    const deliveryAddress = userDeliveryAddress?.deliveryAddress;

    if (!deliveryAddress?.insideDhaka) {
      return {
        deliveryCharge: 120,
      };
    }

    return {
      deliveryCharge: 70,
    };
  }),
});
