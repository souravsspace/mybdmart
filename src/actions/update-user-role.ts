"use server";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { ROLE } from "@prisma/client";

export default async function updateUserRole(id: string, role: ROLE) {
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error("You must be logged in to perform this action");
  }

  if (session?.user.role !== ROLE.ADMIN) {
    throw new Error("You are not authorized to perform this action");
  }

  if (session?.user.id === id) {
    throw new Error("You cannot update your own role");
  }

  const findUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!findUser) {
    throw new Error("User not found");
  }

  await db.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });

  return {
    success: true,
    message: "User role updated successfully",
  };
}
