"use client";

import { Pagination } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PaginationContainer({ total }: { total: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleChange(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  return <Pagination total={total} onChange={handleChange} />;
}
