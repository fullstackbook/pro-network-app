export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
