import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type SearchParam<TSchema extends Record<string, string>> = {
  params?: { [K in keyof TSchema]?: string | null };
};

const isEmpty = (value?: string | null) =>
  value === null || value === "" || typeof value === "undefined";

export function useGenerateUrl<TSchema extends Record<string, string>>() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const generateUrl = ({ params }: SearchParam<TSchema>) => {
    const newSearchParams = new URLSearchParams(searchParams);

    Object.entries(params ?? {}).forEach(([key, value]) => {
      const searchParamsHasKey = searchParams.has(key);

      if (searchParamsHasKey && isEmpty(value)) {
        newSearchParams.delete(key);
      } else if (searchParamsHasKey && !isEmpty(value)) {
        newSearchParams.set(key, value as string);
      } else if (!searchParamsHasKey && !isEmpty(value)) {
        newSearchParams.append(key, value as string);
      }
    });

    newSearchParams.sort();
    return `${pathname}?${newSearchParams.toString()}`;
  };

  return useCallback(generateUrl, [pathname, searchParams]);
}
