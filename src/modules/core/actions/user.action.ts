/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ----  FOR USER LOGIN ----
export async function login(userData: any) {
  try {
    const res = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("login failed:", data);
      throw new Error(data?.message || "login failed");
    }

    console.log("login success:", data);
    if (data?.token) {
      const cookieStore = await cookies();
      cookieStore.set("token", data.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      console.log("Token saved in cookie");
    }
    return data;
  } catch (err) {
    console.error("signup error:", err);
    return null;
  }
}
