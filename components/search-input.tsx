import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const { push } = useRouter();

  function handleSearch(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      const params = new URLSearchParams();
      params.set("query", query);
      push(`/dashboard/search?${params.toString()}`);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  return (
    <TextInput
      rightSection={<IconSearch width={20} />}
      placeholder="Search"
      onKeyDown={handleSearch}
      value={query}
      onChange={handleChange}
    />
  );
}
