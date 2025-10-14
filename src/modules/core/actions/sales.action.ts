/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSalesAnalytics(year?: number | string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      console.error('No token found in cookies');
      return { success: false, error: 'Authentication token missing' };
    }

    const res = await fetch(
      `${API_URL}/api/seller/analytics/complete?year=${
        year || new Date().getFullYear()
      }`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      },
    );

    const data = await res.json().catch(() => null);

    if (!res.ok || !data) {
      console.error('Get sales analytics failed:', data);
      return {
        success: false,
        error: data?.message || 'Failed to fetch sales analytics',
      };
    }

    // ✅ unwrap data here, so frontend doesn’t need data.data
    return { success: true, ...data };
  } catch (err) {
    console.error('getSalesAnalytics error:', err);
    return { success: false, error: 'Something went wrong' };
  }
}
