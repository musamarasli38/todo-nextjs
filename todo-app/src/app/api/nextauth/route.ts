import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import  CredentialsProvider from "next-auth/providers/credentials";
import  {NextAuthOptions} from "next-auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const authOptions : NextAuthOptions =({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true
    }),
        CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { Label: "Username", type: "text",  },
        password: { Label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          throw new Error ("Username and password required");
        }
        const user = await prisma.user.findUnique({
          where: {
            username:credentials.username
          }
        });
        if (!user) {
          throw new Error ("User not found");
        }
        const isValid = await bcrypt.compare (credentials.password, user.password);
        if (!isValid) {
          throw new Error ("Invalid password");
        }
        return {id: user.id, name: user.username, email: user.email};
      },
    }),

  ]
  
})



const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }