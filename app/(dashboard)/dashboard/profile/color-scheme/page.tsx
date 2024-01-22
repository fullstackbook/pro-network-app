"use client";

import { Button, Group, useMantineColorScheme } from "@mantine/core";

export default function Page() {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  return (
    <Group>
      <Button onClick={() => setColorScheme("light")}>Light</Button>
      <Button onClick={() => setColorScheme("dark")}>Dark</Button>
      <Button onClick={() => setColorScheme("auto")}>Auto</Button>
      <Button onClick={() => clearColorScheme()}>Clear</Button>
    </Group>
  );
}
