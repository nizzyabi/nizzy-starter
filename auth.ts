import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import authConfig from "@/auth.config"

// auth
export const{
  handlers: { GET, POST },

  auth, // This auth thing helps us get user info such as for display certain content for them and specific data
  signIn,
  signOut,
} = NextAuth ({
  // if there is an error, redirect to this page
  pages: {
    signIn: '/login',
    error: '/error',
  },
  // events to get emailverfiied if the user used Oauth
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date()}
      })
    }
  },
  // Callbacks allow us to customuzie the auth process such as who has access to what, get ID, and block users.
  callbacks: {
    // sign in
    async signIn({ user, account}) {
      // Allow OAuth without verification
      if(account?.provider !== "credentials") return true;

      // get exisiting user & restrict signin if they have not verified their email
      const exisitingUser = await getUserById(user.id ?? '');
      
      if(!exisitingUser?.emailVerified) return false;

      return true;
    },
    // token & session
    async session({ session, token }) {
  
      // if they have an id (sub) and user has been created, return it
      if (token.sub && session.user) {
      session.user.id = token.sub;
      }

      // if they have a role and user has been created, return it
      if(token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session
    },

    // jwt
    async jwt ({ token }) {
      // fetch user
      if(!token.sub) return token;

      const exisitingUser = await getUserById(token.sub);

      if(!exisitingUser) return token;

      token.role = exisitingUser.role;
      return token;
    },
    // session userId
    
  },
adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})


