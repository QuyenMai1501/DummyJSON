import CartListClient from "../components/CartListClient";
import { CartsResponse } from "../components/types";

async function fetchCarts(): Promise<CartsResponse> {
  const res = await fetch("https://dummyjson.com/carts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch carts");
  }

  return res.json();
}

export default async function DynamicCartsPage() {
  try {
    const data = await fetchCarts();

    return (
      <CartListClient
        initialCarts={data.carts}
        renderMode="Dynamic Rendering (no-store)"
      />
    );
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 ">
          <h2 className="text-red-800 font-bold mb-2">Error Loading Carts</h2>
          <p className="text-red-600">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
        </div>
      </div>
    );
  }
}
