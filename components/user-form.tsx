"use client";

import { updateUser } from "@/lib/actions";
import { User } from "@/lib/types";
import { Button, TextInput, Textarea } from "@mantine/core";
import { useFormState } from "react-dom";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

export default function UserForm({ user }: { user: User }) {
  const initialState = { errors: {} };

  const [state, dispatch] = useFormState(updateUser, initialState);

  useEffect(() => {
    if (state.success) {
      notifications.show({
        title: "Success",
        message: "Profile has been updated",
        color: "green",
      });
    } else if (state.message) {
      notifications.show({
        title: "Error",
        message: "The form submission seems to be invalid",
        color: "red",
      });
    }
  });

  return (
    <div>
      <form action={dispatch} className="flex flex-col gap-5 max-w-xl">
        <div>
          <TextInput
            label="Job Title"
            name="jobTitle"
            error={state?.errors?.jobTitle}
            defaultValue={user.jobTitle!}
          />
        </div>
        <div>
          <Textarea
            label="Bio"
            name="bio"
            error={state?.errors?.bio}
            defaultValue={user.bio!}
          />
        </div>
        <div>
          <Button type="submit">Submit</Button>
        </div>
        <div>
          {state?.success && <p className="text-green-500">{state.success}</p>}
        </div>
      </form>
    </div>
  );
}
