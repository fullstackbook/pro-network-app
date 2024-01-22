"use client";

import { updateUser } from "@/lib/actions";
import { User } from "@/lib/types";
import { Button, TextInput, Textarea } from "@mantine/core";
import { useFormState } from "react-dom";

export default function UserForm({ user }: { user: User }) {
  const initialState = { errors: {} };

  const [state, dispatch] = useFormState(updateUser, initialState);

  return (
    <div>
      <form action={dispatch} className="flex flex-col gap-5">
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
