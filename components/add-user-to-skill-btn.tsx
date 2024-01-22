"use client";

import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

export default function AddUserToSkillBtn() {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Skill" centered></Modal>
      <Button onClick={open} leftSection={<IconPlus />} variant="subtle">
        Add Skill
      </Button>
    </>
  );
}
