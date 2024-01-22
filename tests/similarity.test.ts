import { cosineSimilarity } from "@/lib/similarity";
import { expect, test } from "vitest";

test("cosine similarity exact vectors", () => {
  const vector1 = [5, 5, 5, 5, 5];
  const vector2 = [5, 5, 5, 5, 5];
  const score = cosineSimilarity(vector1, vector2);
  expect(score).toBe(0.9999999999999999);
});

test("cosine similarity similar vectors", () => {
  const vector1 = [5, 5, 5, 5, 5];
  const vector2 = [4, 5, 4, 5, 3];
  const score = cosineSimilarity(vector1, vector2);
  expect(score).toBe(0.9844951849708404);
});

test("cosine similarity exact vector different values", () => {
  const vector1 = [5, 5, 5, 5, 5];
  const vector2 = [1, 1, 1, 1, 1];
  const score = cosineSimilarity(vector1, vector2);
  expect(score).toBe(0.9999999999999999);
});

test("cosine similarity different vectors", () => {
  const vector1 = [5, 4, 0, 0, 0];
  const vector2 = [0, 0, 3, 4, 5];
  const score = cosineSimilarity(vector1, vector2);
  expect(score).toBe(0);
});

test("cosine similarity some overlap", () => {
  const vector1 = [5, 4, 3, 5, 0];
  const vector2 = [0, 0, 3, 4, 5];
  const score = cosineSimilarity(vector1, vector2);
  expect(score).toBe(0.47356801693808104);
});
