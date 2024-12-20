import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import  CredentialsProvider from "next-auth/providers/credentials";
import  {NextAuthOptions} from "next-auth";

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
        username: { Label: "Username", type: "text", placeholder: "jsmith" },
        password: { Label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = {id: "1", name:"musamarasli", email: "musamarasli.com", image: "https://github.com/musamarasli.png"}
        if (user) {
          credentials?.username==="musamarasli" && credentials?.password==="123"
          return user
        } else {
          return null
        }
      },
    }),

  ]
  
})

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }