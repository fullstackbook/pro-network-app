"use client";

import { Pagination } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaginationContainer({
  total,
  value,
}: {
  total: number;
  value: number;
}) {
  const [activePage, setPage] = useState(value);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      const num = parseInt(page);
      setPage(num);
    }
  }, []);

  function handleChange(page: number) {
    setPage(page);
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Pagination total={total} onChange={handleChange} value={activePage} />
  );
}
