"use client";

import { updateSkillRating } from "@/lib/actions";
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
  const [state, dispatch] = useFormState(updateSkillRating, initialState);

  async function handleChange(newRating: number) {
    console.log(newRating);
    const formData = new FormData();
    formData.set("rating", newRating.toString());
    formData.set("skillId", skillId);
    await dispatch(formData);
    console.log(state);
  }

  return <Rating value={rating} onChange={handleChange} />;
}
