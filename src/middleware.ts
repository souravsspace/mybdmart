export const middleware = (request: Request) => {
  console.log("Middleware", request.url);
};

export const config = {
  matcher: ["/admin/:path*", "/orders", "/products", "/settings/:path*"],
};
