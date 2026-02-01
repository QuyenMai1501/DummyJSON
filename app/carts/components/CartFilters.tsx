import { Card, Input, Select } from "./ui";

interface CartFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortField: "total" | "discountedTotal" | "totalProducts";
  onSortFieldChange: (
    value: "total" | "discountedTotal" | "totalProducts",
  ) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (value: "asc" | "desc") => void;
}

export default function CartFilters({
  searchTerm,
  onSearchChange,
  sortField,
  onSortFieldChange,
  sortOrder,
  onSortOrderChange,
}: CartFiltersProps) {
  return (
    <Card className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <Input
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search by Cart ID or Product Title..."
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sort By</label>
          <Select
            value={sortField}
            onChange={(val) => onSortFieldChange(val as any)}
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
            onChange={(val) => onSortOrderChange(val as any)}
            options={[
              { value: "desc", label: "Descending" },
              { value: "asc", label: "Ascending" },
            ]}
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
}
