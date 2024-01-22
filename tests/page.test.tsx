import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

vi.mock("next/font/google", () => ({
  Roboto_Mono: () => ({
    style: {
      fontFamily: "mocked",
    },
  }),
}));

test("Page", () => {
  render(<Page />);
  expect(screen.getByText("Professional Network")).toBeDefined();
});
