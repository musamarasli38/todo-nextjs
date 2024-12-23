import { NextResponse } from "next/server";
import {  PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        // Log incoming request body
        const body = await req.json();
        console.log("Request body:", body);
    
        const { username, password, email, token } = body;
    
        // Validate required fields
        if (!username || !password || !email || !token) {
          console.error("Validation Error: Missing fields in the request");
          return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
    
        // Log token validation
        const validToken = /^[a-fA-F0-9]{6}$/.test(token); // Example validation
if (!validToken) {
    console.error("Validation Error: Invalid token format");
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
}
    
        // Log user count in the database
        const userCount = await prisma.user.count();
        console.log("Total user count:", userCount);
    
        if (userCount > 0) {
          console.warn("Registration attempt blocked: Only one user allowed");
          return NextResponse.json({ error: "Registration is not allowed" }, { status: 403 });
        }
    
        // Log check for existing user
        const existingUser = await prisma.user.findUnique({ where: { email } });
        console.log("Existing user check:", existingUser ? "User exists" : "No user found");
    
        if (existingUser) {
          console.error("Validation Error: User already exists with this email");
          return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
    
        // Log password hashing
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed successfully");
    
        // Log user creation
        const user = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
          },
        });
        console.log("New user created:", user);
        
    
        return NextResponse.json({ message: "User registered successfully", user });
      }catch (error) {
        console.error("Error registering user:", error);
  if (error instanceof PrismaClientKnownRequestError) {
    console.error("Database error:", error.message);
    return NextResponse.json({ error: "Database error. Please try again." }, { status: 500 });
  } else if (error instanceof PrismaClientValidationError) {
    console.error("Validation error:", error.message);
    return NextResponse.json({ error: "Invalid data provided. Please check your input." }, { status: 400 });
  } else {
    console.error("Unexpected Error:", error);
    return NextResponse.json({ error: "Internal Server Error. Please contact support." }, { status: 500 });
  }
}
      
    //return NextResponse.json({ message: "User registered successfully", user });
  }
  