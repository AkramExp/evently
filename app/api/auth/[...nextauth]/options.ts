import { NextAuthOptions } from "next-auth";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models/user.model";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user?.email });

      session.user.id = sessionUser._id;
      session.user.username = sessionUser.username;
      session.user.photo = sessionUser.photo;
      session.user.email = sessionUser.email;

      return session;
    },
    async signIn({ account, profile }) {
      try {
        await connectDB();

        const findUser = await User.findOne({
          $and: [{ email: profile?.email }, { isGoogle: true }],
        });

        if (!findUser) {
          const username =
            profile?.name?.split(" ").at(0) || "" + Math.random().toString();

          await User.create({
            name: profile?.name,
            username,
            email: profile?.email,
            photo: profile?.image,
            isGoogle: true,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
