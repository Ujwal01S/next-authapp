import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import NextAuth, { type DefaultSession } from "next-auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  
  pages:{
     
  },
  events:{
    async linkAccount({user}){
      await db.user.update(({
        where:{id:user.id},
        data:{emailVerified:new Date()}
      }));
    }
  },

  callbacks: {
    // async signIn({ user }) {
    // //if the email is not verified , donot allow for signin.
    //   const existingUser = await getUserById(user.id);

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub; //session ma new field: id haleko , jasma token.sub vanne id haleko
      }
      if (token.role && session.user) {
        session.user.role = token.role; //session ma bew field: role haleko, jasma token.role vanne role haleko
      }

      // if (session.user) {
      //   session.user.customField = token.customField; //jwt ko token.customField lai liyeko, yo settings page ma display gareko xa
      // }
      return session;
    },

    async jwt({ token }) {
      //user, profile do not use because it is undefined many times.

      // token.customField = "test"; // new field add gareko, token {} ma.

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
