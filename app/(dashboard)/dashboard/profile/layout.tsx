import ProfileTabs from "@/components/profile-tabs";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <ProfileTabs />
      <div>{children}</div>
    </div>
  );
}
