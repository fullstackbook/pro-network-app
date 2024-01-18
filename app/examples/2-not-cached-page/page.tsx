export const revalidate = 0;

export default function Page() {
  return (
    <div>
      <p>{new Date().toLocaleTimeString()}</p>
      <p>This page is not cached.</p>
    </div>
  );
}
