"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    token: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/session");
        console.log("Session endpoint response:", res);

        if (!res.ok) throw new Error("Failed to fetch session");

        const session = await res.json();
        console.log("Session data:", session);

        if (session?.user) {
          router.push("/");
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    }
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    alert("Registration successful!");
    router.push("/api/auth/signin");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="6-hexadecimal token"
        value={form.token}
        onChange={(e) => setForm({ ...form, token: e.target.value })}
        required
      />
      <button type="submit">Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
