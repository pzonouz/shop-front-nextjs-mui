"use client";

import { SigninAction } from "@/actions/Auth.action";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useActionState } from "react";

const signin = () => {
  const [state, action, loading] = useActionState(SigninAction, null);
  return (
    <Box
      component="form"
      action={action}
      sx={{
        marginTop: "6rem",
        maxWidth: "20rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginX: "auto",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography
        sx={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}
      >
        Sign In
      </Typography>
      <TextField
        label="Email"
        variant="standard"
        name="email"
        fullWidth
        defaultValue={state?.data?.email}
        helperText={state?.error?.fieldErrors?.email}
        error={!!state?.error?.fieldErrors?.email}
      />
      <TextField
        label="Password"
        variant="standard"
        name="password"
        type="password"
        fullWidth
        defaultValue={state?.data?.password}
        helperText={state?.error?.fieldErrors?.password}
        error={!!state?.error?.fieldErrors?.password}
      />
      {state?.error?.formErrors?.length > 0 && (
        <FormHelperText error={!!state?.error?.formErrors}>
          {JSON.stringify(state?.error?.formErrors)}
        </FormHelperText>
      )}
      <LoadingButton type="submit" variant="contained" loading={loading}>
        SIGN IN
      </LoadingButton>
      <Link component={NextLink} href="/shop/signup">
        Create An Account?
      </Link>
    </Box>
  );
};
export default signin;
