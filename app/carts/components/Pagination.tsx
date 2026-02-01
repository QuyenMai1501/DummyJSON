import { Button } from "./ui";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex justify-center items-center space-x-2">
      <Button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        variant="outline">
        Previous
      </Button>

      <div className="flex space-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            variant={currentPage === page ? "primary" : "outline"}
            className="w-10">
            {page}
          </Button>
        ))}
      </div>

      <Button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        variant="outline">
        Next
      </Button>
    </div>
  );
}
