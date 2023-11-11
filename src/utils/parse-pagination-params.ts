import { z } from "zod";

const DEFAULT_PAGINATION_CONFIG = {
  page: 1,
  limit: {
    min: 10,
    max: 50,
  },
  search: null,
};

type PaginationParams = {
  page: number;
  limit: number;
  skip: number;
  search: string | null;
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
  search: z.string().optional(),
});

export const parsePaginationParams = ({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}): PaginationParams => {
  let search: string | null = DEFAULT_PAGINATION_CONFIG.search;
  let page = DEFAULT_PAGINATION_CONFIG.page;
  let limit = DEFAULT_PAGINATION_CONFIG.limit.min;
  let skip = (page - 1) * limit;

  const parsedSearchParams = paginationSchema.safeParse(searchParams);

  if (parsedSearchParams.success) {
    const {
      page: _page,
      limit: _limit,
      search: _search,
    } = parsedSearchParams.data;
    page = _page ?? page;
    limit = _limit ?? limit;
    skip = (page - 1) * limit;
    search = _search ?? search;
  }

  return {
    page,
    limit,
    search,
    skip,
  };
};
