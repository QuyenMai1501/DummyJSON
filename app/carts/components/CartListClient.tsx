"use client";

import { useState, useMemo } from "react";
import { Cart, Product } from "./types";
import { Card, Button, Input, Select, Table, Badge } from "./ui";
import Image from "next/image";

interface CartListClientProps {
  initialCarts: Cart[];
  renderMode: string;
}

export default function CartListClient({ initialCarts, renderMode }: CartListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"total" | "discountedTotal" | "totalProducts">("total");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCarts, setExpandedCarts] = useState<Set<number>>(new Set());
  const itemsPerPage = 5;

  // Format number with thousand separator
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  // Filter and sort carts
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

  // Pagination
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shopping Carts</h1>
        <Badge variant="info">{renderMode}</Badge>
      </div>

      {/* Controls */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <Input
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by Cart ID or Product Title..."
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <Select
              value={sortField}
              onChange={(val) => setSortField(val as any)}
              options={[
                { value: "total", label: "Total" },
                { value: "discountedTotal", label: "Discounted Total" },
                { value: "totalProducts", label: "Total Products" },
              ]}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Order</label>
            <Select
              value={sortOrder}
              onChange={(val) => setSortOrder(val as any)}
              options={[
                { value: "desc", label: "Descending" },
                { value: "asc", label: "Ascending" },
              ]}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {paginatedCarts.length} of {filteredAndSortedCarts.length} carts
      </div>

      {/* Cart List */}
      {paginatedCarts.length === 0 ? (
        <Card>
          <p className="text-center text-gray-500 py-8">
            No carts found matching your search criteria.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {paginatedCarts.map((cart) => {
            const discount = cart.total - cart.discountedTotal;
            const discountPercent = ((discount / cart.total) * 100).toFixed(1);

            return (
              <Card key={cart.id} className="border-l-4 border-blue-500">
                {/* Cart Header */}
                <div className="border-b pb-4 mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-bold">Cart #{cart.id}</h2>
                    <Button
                      onClick={() => toggleRawJSON(cart.id)}
                      variant="outline"
                      className="text-sm"
                    >
                      {expandedCarts.has(cart.id) ? "Hide" : "Show"} Raw JSON
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">User ID:</span>
                      <span className="ml-2 font-medium">{cart.userId}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Products:</span>
                      <span className="ml-2 font-medium">{cart.totalProducts}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Quantity:</span>
                      <span className="ml-2 font-medium">{cart.totalQuantity}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Cart ID:</span>
                      <span className="ml-2 font-medium">{cart.id}</span>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-600">Original Total:</div>
                        <div className="text-lg font-semibold">${formatNumber(cart.total)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Discount:</div>
                        <div className="text-lg font-semibold text-red-600">
                          -${formatNumber(discount)} ({discountPercent}%)
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Final Total:</div>
                        <div className="text-xl font-bold text-green-600">
                          ${formatNumber(cart.discountedTotal)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Raw JSON */}
                {expandedCarts.has(cart.id) && (
                  <div className="mb-4">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-xs">
                      {JSON.stringify(cart, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Products Table */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Products in Cart</h3>
                  <Table>
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Image</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">ID</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Title</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-700">Price</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-700">Qty</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-700">Discount %</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-700">Total</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-700">Discounted Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">
                            <Image
                              src={product.thumbnail}
                              alt={product.title}
                              width={50}
                              height={50}
                              className="rounded object-cover"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm">{product.id}</td>
                          <td className="px-4 py-2 text-sm font-medium">{product.title}</td>
                          <td className="px-4 py-2 text-sm text-right">${formatNumber(product.price)}</td>
                          <td className="px-4 py-2 text-sm text-right">{product.quantity}</td>
                          <td className="px-4 py-2 text-sm text-right text-red-600">
                            {product.discountPercentage.toFixed(1)}%
                          </td>
                          <td className="px-4 py-2 text-sm text-right font-medium">
                            ${formatNumber(product.total)}
                          </td>
                          <td className="px-4 py-2 text-sm text-right font-bold text-green-600">
                            ${formatNumber(product.discountedTotal)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                {/* Cart Subtotal */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-end space-x-8 text-sm">
                    <div>
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="ml-2 font-medium">${formatNumber(cart.total)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">After Discount:</span>
                      <span className="ml-2 font-bold text-green-600">
                        ${formatNumber(cart.discountedTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center space-x-2">
          <Button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            Previous
          </Button>

          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                variant={currentPage === page ? 'primary' : 'outline'}
                className="w-10"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
