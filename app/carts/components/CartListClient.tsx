"use client";

import { useState, useMemo } from "react";
import { Cart, Product } from "./types";
import { Card} from "./ui";
import CartHeader from "./CartHeader";
import CartFilters from "./CartFilters";
import CartItem from "./CartItem";
import Pagination from "./Pagination";

interface CartListClientProps {
  initialCarts: Cart[];
  renderMode: string;
}

export default function CartListClient({
  initialCarts,
  renderMode,
}: CartListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<
    "total" | "discountedTotal" | "totalProducts"
  >("total");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCarts, setExpandedCarts] = useState<Set<number>>(new Set());
  const itemsPerPage = 5;

  const filteredAndSortedCarts = useMemo(() => {
    let filtered = initialCarts.filter((cart) => {
      const searchLower = searchTerm.toLowerCase();
      const cartIdMatch = cart.id.toString().includes(searchLower);
      const productMatch = cart.products.some((p) =>
        p.title.toLowerCase().includes(searchLower),
      );
      return cartIdMatch || productMatch;
    });

    filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  }, [initialCarts, searchTerm, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedCarts.length / itemsPerPage);
  const paginatedCarts = filteredAndSortedCarts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const toggleRawJSON = (cartId: number) => {
    setExpandedCarts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cartId)) {
        newSet.delete(cartId);
      } else {
        newSet.add(cartId);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <CartHeader renderMode={renderMode} />

      <CartFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortField={sortField}
        onSortFieldChange={setSortField}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />

      <div className="mb-4 text-sm text-gray-600">
        Showing {paginatedCarts.length} of {filteredAndSortedCarts.length} carts
      </div>

      {paginatedCarts.length === 0 ? (
        <Card>
          <p className="text-center text-gray-500 py-8">
            No carts found matching your criteria.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {paginatedCarts.map((cart) => (
            <CartItem
              key={cart.id}
              cart={cart}
              isExpanded={expandedCarts.has(cart.id)}
              onToggleJSON={() => toggleRawJSON(cart.id)}></CartItem>
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
