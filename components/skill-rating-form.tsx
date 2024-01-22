"use client";

import { Rating } from "@mantine/core";
import { useFormState } from "react-dom";

export function SkillRatingForm({
  rating,
  skillId,
}: {
  rating: number;
  skillId: string;
}) {
  const initialState = {};
  // const [state, dispatch] = useFormState()

  async function handleChange(newRating: number) {
    console.log(newRating);
  }

  return <Rating value={rating} onChange={handleChange} />;
}
