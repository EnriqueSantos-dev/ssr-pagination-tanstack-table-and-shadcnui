import { getPaginateGroups } from "@/lib/paginate-groups";
import { z } from "zod";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import DataTablePagination from "./_components/data-table-pagination";

const DEFAULT_PAGINATION_CONFIG = {
  page: 1,
  limit: {
    min: 10,
    max: 50,
  },
  filter: null,
};

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce
    .number()
    .int()
    .min(10)
    .max(DEFAULT_PAGINATION_CONFIG.limit.max)
    .refine((value) => {
      const limitOptions = [10, 20, 30, 40, 50];
      return limitOptions.includes(value);
    })
    .optional(),
  filter: z.string().optional(),
});

export default async function GroupsPage({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  let filter: string | null = DEFAULT_PAGINATION_CONFIG.filter;
  let page = DEFAULT_PAGINATION_CONFIG.page;
  let limit = DEFAULT_PAGINATION_CONFIG.limit.min;
  let skip = (page - 1) * limit;

  const parsedSearchParams = paginationSchema.safeParse(searchParams);

  if (parsedSearchParams.success) {
    const {
      page: _page,
      limit: _limit,
      filter: _filter,
    } = parsedSearchParams.data;
    page = _page ?? page;
    skip = (page - 1) * limit;
    limit = _limit ?? limit;
    filter = _filter ?? filter;
  }

  const groups = await getPaginateGroups({ skip, take: limit, filter });

  const totalPages = Math.ceil(groups.total / limit);

  return (
    <main className="p-6">
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
