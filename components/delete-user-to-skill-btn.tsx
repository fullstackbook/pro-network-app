"use client";

import { deleteUserToSkill } from "@/lib/actions";
import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

export default function DeleteUserToSkillBtn({ skillId }: { skillId: string }) {
  function handleClick() {
    console.log("remove", skillId);
    deleteUserToSkill(skillId);
  }

  return (
    <Button
      leftSection={<IconTrash />}
      variant="subtle"
      onClick={handleClick}
      color="red"
    >
      Remove
    </Button>
  );
}
