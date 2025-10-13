/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createProduct(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.error("No token found in cookies");
      return { success: false, error: "Authentication token missing" };
    }

    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("Create product failed:", data);
      return {
        success: false,
        error: data?.message || "Create product failed",
      };
    }

    return { success: true, data };
  } catch (err) {
    console.error("createProduct error:", err);
    return { success: false, error: "Something went wrong" };
  }
}

export async function getProducts(page = 1, limit = 5) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.error("No token found in cookies");
      return { success: false, error: "Authentication token missing" };
    }

    const res = await fetch(
      `${API_URL}/api/products?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("Fetch products failed:", data);
      return {
        success: false,
        error: data?.message || "Failed to fetch products",
      };
    }

    return { success: true, data };
  } catch (err) {
    console.error("getProducts error:", err);
    return { success: false, error: "Something went wrong" };
  }
}

// export async function updateProduct(productId: string, formData: FormData) {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       console.error("No token found in cookies");
//       return { success: false, error: "Authentication token missing" };
//     }

//     const res = await fetch(`${API_URL}/api/products/${productId}`, {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//       cache: "no-store",
//     });

//     const data = await res.json().catch(() => null);

//     if (!res.ok) {
//       console.error("Update product failed:", data);
//       return {
//         success: false,
//         error: data?.message || "Failed to update product",
//       };
//     }

//     return { success: true, data };
//   } catch (err) {
//     console.error("updateProduct error:", err);
//     return { success: false, error: "Something went wrong" };
//   }
// }   YET NOT DESIGNED NEED TO Migrate the design

export async function deleteProducts(productId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.error("No token found in cookies");
      return { success: false, error: "Authentication token missing" };
    }

    const res = await fetch(`${API_URL}/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("Delete product failed:", data);
      return {
        success: false,
        error: data?.message || "Failed to delete product",
      };
    }

    return { success: true, data };
  } catch (err) {
    console.error("deleteProduct error:", err);
    return { success: false, error: "Something went wrong" };
  }
}
