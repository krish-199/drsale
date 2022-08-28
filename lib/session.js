// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSessionApiRoute } from "iron-session/next";

export default function withSession(handler) {
  return withIronSessionApiRoute(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "iron-cookie",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      maxAge: 60 * 60 * 24 * 30, // 30 days
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });
}
