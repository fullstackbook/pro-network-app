export default function Page() {
  return (
    <div>
      <p>{new Date().toLocaleTimeString()}</p>
      <p>This page is cached.</p>
    </div>
  );
}
