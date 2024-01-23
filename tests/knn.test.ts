import { getKNearestNeighborsByUserId } from "@/lib/knn";
import { expect, test } from "vitest";
import util from "util";

test("k nearest neighbors", async () => {
  const users = await getKNearestNeighborsByUserId(
    "00db0b18-14e8-4d81-9087-49da4128545f",
    5
  );
  console.log(util.inspect(users, { colors: true, depth: null }));
  expect(users.length).toBe(5);
});
