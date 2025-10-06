/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ----  FOR SIGNUP ----
export async function signup(userData: any) {
  try {
    const res = await fetch(`${API_URL}/api/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("Signup failed:", data);
      throw new Error(data?.message || "Signup failed");
    }

    // console.log("Signup success:", data);
    if (data?.token) {
      const cookieStore = await cookies();
      cookieStore.set("token", data.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days test it
      });
      // console.log("Token saved in cookie");
    }
    return data;
  } catch (err) {
    console.error("signup error:", err);
    return null;
  }
}

// ---- SEND PHONE ON OTP ----
export async function sendPhoneOtp(phone: string) {
  try {
    const res = await fetch(`${API_URL}/api/users/send-phone-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("Send phone OTP failed:", data);
      throw new Error(
        data?.message || `Send phone OTP failed (status ${res.status})`
      );
    }

    // console.log("Phone OTP sent successfully:", data);
    return data;
  } catch (err) {
    console.error("sendPhoneOtp error:", err);
    return null;
  }
}

// ---- VERIFY PHONE OTP ----
export async function verifyPhoneOtp(phone: string, otp: string) {
  try {
    const res = await fetch(`${API_URL}/api/users/verify-phone-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        error:
          data?.message || `Verify phone OTP failed (status ${res.status})`,
      };
    }

    // console.log("Phone OTP verified successfully:", data);
    return { success: true, data };
  } catch (err) {
    console.error("verifyPhoneOtp error:", err);
    return { success: false, error: "Something went wrong" };
  }
}

// ---- SEND EMAIL OTP ----
export async function sendEmailOtp(email: string) {
  try {
    const res = await fetch(`${API_URL}/api/users/send-email-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("Send email OTP failed:", data);
      throw new Error(data?.message || "Send email OTP failed");
    }

    // console.log("Email OTP sent successfully:", data);
    return data;
  } catch (err) {
    console.error("sendEmailOtp error:", err);
    return null;
  }
}

// ---- VERIFY EMAIL OTP ----
export async function verifyEmailOtp(email: string, otp: string) {
  try {
    const res = await fetch(`${API_URL}/api/users/verify-email-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("Verify email OTP failed:", data);
      return {
        success: false,
        error: data?.message || "Verify email OTP failed",
      };
    }

    // console.log("Email OTP verified successfully:", data);
    return { success: true, data };
  } catch (err) {
    console.error("verifyEmailOtp error:", err);
    return { success: false, error: "Something went wrong" };
  }
}

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
      console.error("Login failed:", data);
      throw new Error(data?.message || "Login failed");
    }

    // console.log("Login success:", data);
    if (data?.token) {
      const cookieStore = await cookies();
      cookieStore.set("token", data.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days test it
      });
      // console.log("Token saved in cookie");
    }
    return data;
  } catch (err) {
    console.error("Login error:", err);
    return null;
  }
}
