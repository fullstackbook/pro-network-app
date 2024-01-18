import RevalidateBtn from "@/components/revalidate-btn";
import { revalidatePath } from "next/cache";

async function forceRevalidate() {
  "use server";
  revalidatePath("/examples/4-on-demand-revalidation");
}

export default function Page() {
  return (
    <div>
      <p>{new Date().toLocaleTimeString()}</p>
      <p>This page is cached. Click to revalidate</p>
      <RevalidateBtn action={forceRevalidate} />
    </div>
  );
}
