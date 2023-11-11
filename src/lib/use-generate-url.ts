import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type SearchParam = {
  params?: { [key: string]: string | null }[];
};

const isEmpty = (value?: string | null) =>
  value === null ||
  value === "" ||
  value?.trim().length === 0 ||
  typeof value === "undefined";

export function useGenerateUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const generateUrl = ({ params }: SearchParam) => {
    const newSearchParams = new URLSearchParams(searchParams);

    params?.forEach((param) => {
      const key = Object.keys(param)[0];
      const value = param[key];
      const searchParamsHasKey = searchParams.has(key);

      if (searchParamsHasKey && isEmpty(value)) {
        newSearchParams.delete(key);
        return;
      }

      if (searchParamsHasKey && !isEmpty(value)) {
        newSearchParams.set(key, value as string);
        return;
      }

      if (!isEmpty(value)) {
        newSearchParams.append(key, value as string);
        return;
      }
    });

    newSearchParams.sort();
    return `${pathname}?${newSearchParams.toString()}`;
  };

  return useCallback(generateUrl, [searchParams, pathname]);
}
