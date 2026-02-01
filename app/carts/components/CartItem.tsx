import { Cart } from "./types";
import { Card, Button } from "./ui";
import CartSummary from "./CartSummary";
import ProductsTable from "./ProductsTable";

interface CartItemProps {
  cart: Cart;
  isExpanded: boolean;
  onToggleJSON: () => void;
}

export default function CartItem({
  cart,
  isExpanded,
  onToggleJSON,
}: CartItemProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <Card key={cart.id} className="border-l-4 border-blue-500">
      <div className="border-b pb-4 mb-4">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-2xl font-bold">Cart #{cart.id}</h2>
          <Button onClick={onToggleJSON} variant="outline" className="text-sm">
            {isExpanded ? "Hide" : "Show"} Raw JSON
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

        <CartSummary
          total={cart.total}
          discountedTotal={cart.discountedTotal}
        />
      </div>

      {isExpanded && (
        <div className="mb-4">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-xs">
            {JSON.stringify(cart, null, 2)}
          </pre>
        </div>
      )}

      <ProductsTable products={cart.products} />

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-end space-x-8 text-sm">
          <div>
            <span className="text-gray-600">Subtotal:</span>
            <span className="ml-2 font-medium">
              ${formatNumber(cart.total)}
            </span>
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
}
