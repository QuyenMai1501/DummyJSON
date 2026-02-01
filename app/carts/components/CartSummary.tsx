interface CartSummaryProps {
  total: number;
  discountedTotal: number;
}

export default function CartSummary({
  total,
  discountedTotal,
}: CartSummaryProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const discount = total - discountedTotal;
  const discountPercent = ((discount / total) * 100).toFixed(1);

  return (
    <div className="mt-3 p-3 bg-gray-50 rounded">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-600">Origin Total:</div>
          <div className="text-lg font-semibold">${formatNumber(total)}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Discount:</div>
          <div className="text-lg font-semibold text-red-600">
            -${formatNumber(discount)} ({discountPercent}%)
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Final Total:</div>
          <div className="text-lg font-bold text-green-600">
            ${formatNumber(discountedTotal)}
          </div>
        </div>
      </div>
    </div>
  );
}
