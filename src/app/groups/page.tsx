import { getPaginateGroups } from "@/lib/paginate-groups";
import { parsePaginationParams } from "@/utils/parse-pagination-params";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { DataTablePagination } from "./_components/data-table-pagination";

export default async function GroupsPage({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) {
  const { search, limit, page, skip } = parsePaginationParams({ searchParams });

  const groups = await getPaginateGroups({ skip, take: limit, filter: search });
  const totalPages = Math.ceil(groups.total / limit);

  return (
    <main className="p-6 container mx-auto">
      <DataTable
        data={groups.data}
        columns={columns}
        total={groups.total}
        pageSize={limit}
      >
        <DataTablePagination
          currentPage={page}
          currentPageSize={limit}
          totalPages={totalPages}
        />
      </DataTable>
    </main>
  );
}
