import { NextResponse } from "next/server";
import { getIronSession } from "iron-session/edge";

export const middleware = async (req) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "iron-cookie",
    password: process.env.SECRET_COOKIE_PASSWORD,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });

  // do anything with session here:
  const { user } = session;

  // like mutate user:
  // user.something = someOtherThing;
  // or:
  // session.user = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();

  // demo:
  if (!user) {
    return new NextResponse(null, { status: 403 });
  }

  return res;
};

export const config = {
  matcher: [
    "/api/getUser/:path*",
    "/api/lastDetails/:path*",
    "/api/new-patient",
    "/api/search-user",
    "/api/visit",
  ],
};
