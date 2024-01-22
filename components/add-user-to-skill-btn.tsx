"use client";

import { AddUsersToSkillsState, addUsersToSkills } from "@/lib/actions";
import { Skill } from "@/lib/types";
import { Button, Modal, Rating, Select, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function AddUserToSkillBtn({
  allSkills,
}: {
  allSkills: Skill[];
}) {
  const [opened, { open, close }] = useDisclosure();
  const [value, setValue] = useState(0);

  const initialState: AddUsersToSkillsState = {};

  const [state, dispatch] = useFormState(addUsersToSkills, initialState);

  const data = allSkills.map((skill) => {
    return {
      value: skill.id,
      label: skill.name,
    };
  });
  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Skill" centered>
        <form action={dispatch}>
          <Stack gap={20}>
            <Select
              data={data}
              searchable
              name="skillId"
              error={state?.errors?.skillId}
            />
            <Rating value={value} onChange={setValue} name="rating" />
            {state.errors?.rating && (
              <p className="text-red-600">{state.errors.rating}</p>
            )}
            <div>
              <Button type="submit">Submit</Button>
            </div>
            {state.message && <p className="text-red-600">{state.message}</p>}
            {state.success && <p className="text-green-600">{state.success}</p>}
          </Stack>
        </form>
      </Modal>
      <Button onClick={open} leftSection={<IconPlus />} variant="subtle">
        Add Skill
      </Button>
    </>
  );
}
