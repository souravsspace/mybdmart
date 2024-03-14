import { env } from "@/env";
import { Resend } from "resend";

export const resend = new Resend(env.RESEND_API_KEY);
// export const resend = new Resend(process.env.RESEND_API_KEY as string);
