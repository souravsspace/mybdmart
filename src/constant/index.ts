import { STOCK } from "@prisma/client";

export const supportEmail = "info@mybdmart.com";
export const supportPhone = "+880 123 456 7890";
export const supportAddress = "Dhaka, Bangladesh";

export const contactFormTopic = [
  {
    value: "general-inquiry",
    label: "General Inquiry",
  },
  {
    value: "order-inquiry",
    label: "Order Inquiry",
  },
  {
    value: "return-inquiry",
    label: "Return Inquiry",
  },
  {
    value: "bug-report",
    label: "Bug Report",
  },
  {
    value: "others",
    label: "Others",
  },
] as const;

export const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Hot Deals",
    path: "/products?sort=hot-deals",
  },
  {
    name: "Trending",
    path: "/products?sort=trending-products",
  },
  {
    name: "Featured",
    path: "/products?sort=featured-products",
  },
  {
    name: "Contact Us",
    path: "/contact-us",
  },
] as const;

export const productStockStatus = [
  {
    value: STOCK.IN_STOCK,
    label: "In Stock",
  },
  {
    value: STOCK.OUT_OF_STOCK,
    label: "Out of Stock",
  },
  {
    value: STOCK.LOW_STOCK,
    label: "Low Stock",
  },
] as const;
