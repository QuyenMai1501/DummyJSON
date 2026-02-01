import { Badge } from "./ui";

interface CartHeaderProps {
  renderMode: string;
}

export default function CartHeader({ renderMode }: CartHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Shopping Carts</h1>
      <Badge>{renderMode}</Badge>
    </div>
  );
}
