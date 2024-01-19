"use client";

import { Pagination } from "@mantine/core";

export default function PaginationContainer({ total }: { total: number }) {
  return <Pagination total={total} />;
}
