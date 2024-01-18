"use client";

export default function RevalidateBtn({ action }: { action: any }) {
  return (
    <form action={action}>
      <button type="submit">revalidate</button>
    </form>
  );
}
