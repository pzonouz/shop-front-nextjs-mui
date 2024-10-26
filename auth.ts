import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: { signIn: "/signin" },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/signin/`, {
          body: JSON.stringify(credentials),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          return data;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        // @ts-ignore
        token.access = user?.access;
        // @ts-ignore
        token.first_name = user?.first_name;
        // @ts-ignore
        token.last_name = user?.last_name;
        token.email = user?.email;
        token.image = user?.image;
      }
      return token;
    },
    session: ({ session, token }) => {
      // @ts-ignore
      session.access = token?.access;
      // @ts-ignore
      session.user.first_name = token?.first_name;
      // @ts-ignore
      session.user.last_name = token?.last_name;
      // @ts-ignore
      session.user.email = token?.email;
      // @ts-ignore
      session.user.image = token?.image;
      return session;
    },
  },
});
