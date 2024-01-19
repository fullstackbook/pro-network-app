import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SessionProvider from "@/components/session-provider";
import AppShellContainer from "@/components/app-shell-container";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <SessionProvider session={session}>
      <AppShellContainer>{children}</AppShellContainer>
    </SessionProvider>
  );
}
