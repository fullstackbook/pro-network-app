export const revalidate = 5;

export default function Page() {
  return (
    <div>
      <p>{new Date().toLocaleTimeString()}</p>
      <p>This page is revalidated every 5 seconds.</p>
    </div>
  );
}
