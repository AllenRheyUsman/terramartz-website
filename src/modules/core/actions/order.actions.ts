/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSellerOrders(
  page: number = 1,
  limit: number = 10,
  sort: string = 'recent',
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      console.error('❌ No token found in cookies');
      return { success: false, error: 'Authentication token missing' };
    }

    // --- build URL ---
    const url = `${API_URL}/api/seller/orders?page=${page}&limit=${limit}&sort=${sort}`;
    console.log('📦 Fetching Orders from:', url);

    // --- make request ---
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('📡 Response Status:', res.status);

    // --- parse response ---
    const data = await res.json().catch((err) => {
      console.error('⚠️ Failed to parse JSON:', err);
      return null;
    });

    console.log('🧩 Response Data:', data);

    // --- handle errors ---
    if (!res.ok || !data) {
      console.error('❌ Fetching orders failed:', data);
      return {
        success: false,
        error: data?.message || 'Failed to fetch orders',
      };
    }

    // ✅ return successful data
    console.log('✅ Orders Fetch Successful');
    return { success: true, ...data };
  } catch (err) {
    console.error('🔥 getSellerOrders error:', err);
    return { success: false, error: 'Something went wrong' };
  }
}
