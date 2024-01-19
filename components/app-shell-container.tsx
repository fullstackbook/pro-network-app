"use client";

import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

export default function AppShellContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AppShell>
      <AppShell.Header>header</AppShell.Header>
      <AppShell.Navbar>navbar</AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
