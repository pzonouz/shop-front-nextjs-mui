"use client";

import { UserType } from "@/types/UserType";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useActionState } from "react";
import { EditUserAction } from "@/actions/Auth.action";

const UserInfo = ({ user }: { user: UserType }) => {
  const [_state, action, loading] = useActionState(EditUserAction, null);
  return (
    <Box
      component="form"
      action={action}
      sx={{ display: "flex", gap: 1, flexDirection: "column" }}
    >
      <TextField defaultValue={user?.firstname} name="firstname" />
      <TextField defaultValue={user?.lastname} name="lastname" />
      <TextField defaultValue={user?.address} name="address" />
      <LoadingButton variant="contained" loading={loading} type="submit">
        Submit
      </LoadingButton>
    </Box>
  );
};

export { UserInfo };
