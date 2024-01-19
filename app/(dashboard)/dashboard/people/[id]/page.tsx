export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
