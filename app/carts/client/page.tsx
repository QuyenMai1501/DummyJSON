'use client';

import { useEffect, useState } from "react";
import { CartsResponse } from "../components/types";
import CartListClient from "../components/CartListClient";

export default function ClientCartsPage() {
  const [data, setData] = useState<CartsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCarts() {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/carts");
        if (!res.ok) {
          throw new Error("Failed to fetch carts");
        }
        const data = await res.json();
        setData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCarts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6 mb-8"></div>

          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>

          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-bold mb-2">Error Loading Carts</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <CartListClient
      initialCarts={data.carts}
      renderMode="Client-side Rendering (useEffect)"
    />
  );
}
