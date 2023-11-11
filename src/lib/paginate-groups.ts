import { Group } from "@prisma/client";
import { prisma } from "./prisma";

interface PaginatedResult {
  data: Group[];
  total: number;
}

interface PaginateParams {
  skip: number;
  take: number;
  filter: string | null;
}

export async function getPaginateGroups(
  params: PaginateParams
): Promise<PaginatedResult> {
  const { skip, take, filter } = params;

  const where = filter
    ? { description: { contains: filter, mode: "insensitive" } }
    : undefined;

  const [data, total] = await Promise.all([
    fetchGroups({ where, skip, take }),
    countGroups(where),
  ]);

  return { data, total };
}

async function fetchGroups(
  params: Omit<PaginateParams, "filter"> & { where?: Record<string, any> }
): Promise<Group[]> {
  const { where, skip, take } = params;
  return prisma.group.findMany({ where, skip, take });
}

async function countGroups(where?: Record<string, any>): Promise<number> {
  return prisma.group.count({ where });
}
