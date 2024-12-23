import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // If no user is logged in, redirect to the register page
    if (!req.nextauth.token) {
      const url = req.nextUrl.clone();
      url.pathname = "/register";
      return NextResponse.redirect(url);
    }

    // Continue to the requested page if logged in
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // User is authorized if a token exists
    },
  }
);

// Configure which paths to protect
export const config = {
  matcher: ["/tasks"], // Replace with the paths you want to protect
};
