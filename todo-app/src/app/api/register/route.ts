import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password, email, token } = body;

  if (!username || !password || !email || !token) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const validToken = /^[a-fA-F0-9]{6}$/.test(token);
  if (!validToken) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: "User registered successfully", user });
}
