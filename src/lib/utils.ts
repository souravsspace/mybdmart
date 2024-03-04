import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
  }).format(price);
}

export async function copyText(value: string) {
  // await navigator.clipboard.writeText(value);
  return navigator.clipboard.writeText(value);
}

export function formatDate(date: Date) {
  return format(date, "hh:mm a, dd MMMM yyyy");
}

export const thirtyDaysAge = new Date();
thirtyDaysAge.setDate(thirtyDaysAge.getDate() - 7);

export function calculateDiscountPercentage(
  originalPrice: number,
  discountedPrice: number,
) {
  const priceDifference = originalPrice - discountedPrice;
  const discountPercentage = (priceDifference / originalPrice) * 100;
  return Number(discountPercentage.toFixed(2));
}
