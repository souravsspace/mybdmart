"use server";

import { db } from "@/server/db";

export async function deleteToken(identifier: string, token: string) {
  try {
    await db.verificationToken.delete({
      where: {
        identifier,
        token,
      },
    });
  } catch (error) {
    throw error;
  }
}
