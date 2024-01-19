import { Skeleton } from "@mantine/core";

const skeletons = new Array(10).fill(true);

export default function Loading() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-xl">People</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skeletons.map((val, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center w-full h-full rounded bg-slate-100 dark:bg-slate-700 p-5 gap-5"
          >
            <Skeleton height={100} circle mb="xl" />
            <Skeleton height={8} width={"50%"} />
            <Skeleton height={8} width={"50%"} mt={6} />
          </div>
        ))}
      </div>
    </div>
  );
}
