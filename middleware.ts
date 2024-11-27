import { auth } from "@/auth";

export default auth((req) => {
  if (req.nextUrl.pathname == "/") {
    const newUrl = new URL("shop", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  if (
    !req.auth &&
    req.nextUrl.pathname !== "/shop/signin" &&
    req.nextUrl.pathname !== "/shop/signup" &&
    req.nextUrl.pathname !== "/shop/"
  ) {
    const newUrl = new URL("shop/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
