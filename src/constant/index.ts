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

export const shoes = [
  {
    brand: "Nike",
    name: "Air Max 270",
    price: 150,
    image: "/shoes/shoes_1.jpg",
    color: "black",
  },
  {
    brand: "Adidas",
    name: "Ultra Boost",
    price: 180,
    image: "/shoes/shoes_2.jpg",
    color: "red",
  },
  {
    brand: "Nike",
    name: "Air Max 570",
    price: 250,
    image: "/shoes/shoes_3.jpg",
    color: "white",
  },
  {
    brand: "Adidas",
    name: "Ultra Boost X2",
    price: 280,
    image: "/shoes/shoes_4.jpg",
    color: "blue",
  },
] as const;

export const tshirt = [
  {
    name: "Dylan Morales",
    price: 120,
    image: "/tshirt/tshirt_1.jpg",
    color: "black",
  },
  {
    name: "Cecilia Schmidt",
    price: 120,
    image: "/tshirt/tshirt_1.jpg",
    color: "white",
  },
  {
    name: "Lottie Foster",
    price: 120,
    image: "/tshirt/tshirt_1.jpg",
    color: "white",
  },
  {
    name: "Mark Guzman",
    price: 120,
    image: "/tshirt/tshirt_1.jpg",
    color: "blue",
  },
] as const;
