import Link from "next/link";

export default function Page() {
  return (
    <div>
      <p>
        The react server component payload is prefetched when link is in
        viewport
      </p>
      <Link href="/examples/1-cached-page">1-cached-paged</Link>
      <Link href="/examples/2-not-cached-page">2-not-cached-page</Link>
    </div>
  );
}
