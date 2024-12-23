// ./src/app/api/auth/session/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";  

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    return new Response(JSON.stringify(session), { status: 200 });
  } catch (error) {
    console.error("Error fetching session:", error);
    return new Response("Error fetching session", { status: 500 });
  }
}
