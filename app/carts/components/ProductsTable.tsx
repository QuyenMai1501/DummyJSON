import { Product } from "./types";
import { Table } from "./ui";
import Image from "next/image";

interface ProductsTableProps {
  products: Product[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Products in Cart</h3>
      <Table>
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
              Image
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
              ID
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
              Title
            </th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-700">
              Price
            </th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-700">
              Qty
            </th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-700">
              Discount %
            </th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-700">
              Total
            </th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-700">
              Discounted Total
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
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
              <td className="px-4 py-2 text-sm text-right">
                ${formatNumber(product.price)}
              </td>
              <td className="px-4 py-2 text-sm text-right">
                {product.quantity}
              </td>
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
  );
}
