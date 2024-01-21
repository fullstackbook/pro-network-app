"use client";

import { ComboboxItem, Select } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortSkillSelect({ value }: { value: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleChange(value: string | null, option: ComboboxItem) {
    console.log(value, option);
    const params = new URLSearchParams(searchParams);
    if (!value) {
      return;
    }
    params.set("sort", value);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Select
      label="Sort"
      data={[
        { value: "name", label: "Name A to Z" },
        { value: "-name", label: "Name Z to A" },
        { value: "rating", label: "Rating Low to High" },
        { value: "-rating", label: "Rating High to Low" },
      ]}
      onChange={handleChange}
      value={value}
      placeholder="Sort by Name or Rating"
    />
  );
}
