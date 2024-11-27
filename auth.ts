import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
        token.firstName = user?.firstname;
        // @ts-ignore
        token.lasName = user?.lastname;
        token.email = user?.email;
        token.image = user?.image;
        token.isAdmin = user?.is_admin;
      }
      return token;
    },
    session: ({ session, token }) => {
      // @ts-ignore
      session.access = token?.access;
      // @ts-ignore
      session.user.firstName = token?.firstName;
      // @ts-ignore
      session.user.lastName = token?.lastName;
      // @ts-ignore
      session.user.email = token?.email;
      // @ts-ignore
      session.user.image = token?.image;
      session.user.isAdmin = token?.isAdmin;
      return session;
    },
  },
});
