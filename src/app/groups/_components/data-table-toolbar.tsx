import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/use-debounce";
import { useGenerateUrl } from "@/lib/use-generate-url";
import { Table } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTableViewOptions } from "./data-table-view-options";

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
};

export default function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const generateUrl = useGenerateUrl();

  const [value, setValue] = useState<string | null>(
    searchParams.get("filter") ?? null
  );
  const debounceValue = useDebounce(value, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const url = generateUrl({
      params: [{ filter: debounceValue, page: null }],
    });
    router.push(url);
  }, [debounceValue, generateUrl, router]);

  return (
    <div className="flex justify-between">
      <search>
        <form onSubmit={handleSubmit}>
          <Input
            type="search"
            placeholder="Filtre pelo nome..."
            value={value ?? ""}
            onChange={handleSearch}
          />
        </form>
      </search>
      <DataTableViewOptions table={table} />
    </div>
  );
}
