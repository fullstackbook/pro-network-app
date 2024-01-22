"use client";

import { Tabs } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

export default function ProfileTabs() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tabs value={pathname} onChange={(value) => router.push(`${value}`)}>
      <Tabs.List>
        <Tabs.Tab value="/dashboard/profile">Profile</Tabs.Tab>
        <Tabs.Tab value="/dashboard/profile/skills">Manage Skills</Tabs.Tab>
        <Tabs.Tab value="/dashboard/profile/color-scheme">
          Color Scheme
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
