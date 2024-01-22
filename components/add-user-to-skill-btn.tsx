"use client";

import { Skill } from "@/lib/types";
import { Button, Modal, Select, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

export default function AddUserToSkillBtn({
  allSkills,
}: {
  allSkills: Skill[];
}) {
  const [opened, { open, close }] = useDisclosure();

  const data = allSkills.map((skill) => {
    return {
      value: skill.id,
      label: skill.name,
    };
  });
  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Skill" centered>
        <form>
          <Stack gap={20}>
            <Select data={data} searchable name="skillId" />
          </Stack>
        </form>
      </Modal>
      <Button onClick={open} leftSection={<IconPlus />} variant="subtle">
        Add Skill
      </Button>
    </>
  );
}
