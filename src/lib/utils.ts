import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  const formattedPrice = new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
  }).format(price);

  return formattedPrice;
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

type BanglaDigit = { [key: number]: string };

export function englishToBanglaNumber(number: number | undefined): string {
  if (!number) return "Input must be a number";
  // if (isNaN(number)) return "Input must be a number";

  const banglaDigits: BanglaDigit = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };

  // Convert number to string and split into digits
  const numberString = number.toString().split("");

  // Convert each digit to Bangla
  const banglaNumber = numberString.map(
    (digit: string) => banglaDigits[Number(digit)] || digit,
  );

  // Join the Bangla digits
  const formattedNumber = banglaNumber.join("");

  // Remove the trailing ".০০"
  return formattedNumber.replace(/\.০০$/, "");
}
