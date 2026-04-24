export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/start",
    "/start/dashboard/:path*",
    "/start/projects/:path*",
    "/start/endpoints/:path*",
    "/start/scenario/:path*",
    
  ],
};