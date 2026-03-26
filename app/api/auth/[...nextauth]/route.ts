// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import bcrypt from "bcryptjs";
// import client from "@/lib/mongoClient";
// import { connectDB } from "@/lib/mongoose";
// import User from "@/models/User";

// const handler = NextAuth({
//   adapter: MongoDBAdapter(client),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID!,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET!,
//     }),

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Lösenord", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email och lösenord krävs.");
//         }

//         await connectDB();

//         const user = await User.findOne({ email: credentials.email });

//         if (!user) {
//           throw new Error("Ingen användare hittades.");
//         }

//         const isPasswordValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isPasswordValid) {
//           throw new Error("Fel lösenord.");
//         }

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name,
//         };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/start/login",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
// });

// export { handler as GET, handler as POST };
import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };