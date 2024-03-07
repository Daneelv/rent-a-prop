import connectDB from "@/config/database";
import User from "@/models/User";

import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //invoked on successfull sign in
    async signIn({ profile }) {
      //1 Connect to the database
      await connectDB();

      // 2 Check if user already exists in  the database
      const userExists = await User.findOne({ email: profile.email });

      //3 if not then  add the user to the database
      if (!userExists) {
        // Truncate user name if it is to long
        const username = profile.name.slice(0, 20);

        //Persist user inthe database
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // allow sign in to continue
      return true;
    },
    async session({ session }) {
      // 1 Get user form database
      const user = await User.findOne({ email: session.user.email });

      //2 Assign the user id to the session
      session.user.id = user._id.toString();

      //3 return session
      return session;
    },
  },
};
