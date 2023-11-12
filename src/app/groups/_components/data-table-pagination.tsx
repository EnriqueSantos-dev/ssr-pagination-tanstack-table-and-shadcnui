"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGenerateUrl } from "@/lib/use-generate-url";
import { useRouter } from "next/navigation";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

type DataTablePaginationProps = {
  totalPages: number;
  currentPage: number;
  currentPageSize: number;
};

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];

export function DataTablePagination({
  totalPages,
  currentPageSize,
  currentPage,
}: DataTablePaginationProps) {
  const router = useRouter();
  const generateUrl = useGenerateUrl<{ page: string; limit: string }>();
  const canPreviousPage = currentPage > 1;
  const canGetNextPage = currentPage < totalPages;

  const handleNextPage = (value?: number) => {
    if (canGetNextPage) {
      router.push(
        generateUrl({ params: { page: `${value ?? currentPage + 1}` } })
      );
    }
  };

  const handlePreviousPage = (value?: number) => {
    if (canPreviousPage) {
      router.push(
        generateUrl({ params: { page: `${value ?? currentPage - 1}` } })
      );
    }
  };

  const onChangeLimit = (limit: string) => {
    router.push(generateUrl({ params: { limit } }));
  };

  return (
    <div className="flex justify-end items-center gap-4 text-sm">
      <div className="flex items-center gap-3">
        <span className="whitespace-nowrap">Linhas por página</span>
        <Select
          defaultValue={`${currentPageSize}`}
          onValueChange={onChangeLimit}
        >
          <SelectTrigger className="w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZE_OPTIONS.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {totalPages > 0 && (
        <div>
          <span className="tabular-nums">
            Pág {currentPage} de {totalPages}
          </span>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="h-8 w-8 p-0 flex"
          onClick={() => handlePreviousPage(1)}
          disabled={!canPreviousPage}
        >
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handlePreviousPage()}
          disabled={!canPreviousPage}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handleNextPage()}
          disabled={!canGetNextPage}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0 flex"
          onClick={() => handleNextPage(totalPages)}
          disabled={!canGetNextPage}
        >
          <span className="sr-only">Go to last page</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
