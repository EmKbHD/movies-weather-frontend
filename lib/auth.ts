import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [],
});
