"use client";

import { updateUser } from "@/lib/actions";
import { User } from "@/lib/types";
import { Button, TextInput, Textarea } from "@mantine/core";
import { useFormState } from "react-dom";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import Editor from "./editor";

export default function UserForm({ user }: { user: User }) {
  const initialState = { errors: {} };

  const [state, dispatch] = useFormState(updateUser, initialState);
  const [bio, setBio] = useState(user.bio);

  function handleUpdate(html: string) {
    setBio(html);
  }

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
          <label>Bio</label>
          <Editor content={user.bio || ""} onUpdate={handleUpdate} />
          <input type="hidden" name="bio" value={bio || ""} />
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
