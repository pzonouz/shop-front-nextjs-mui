"use client";
import { useActionState } from "react";
import {
  Box,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import NextLink from "next/link";
import { SignupAction } from "@/actions/Auth.action";

const Singup = () => {
  const [state, action, loading] = useActionState(SignupAction, null);
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
        Sign Up
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
      <TextField
        label="Password confirm"
        variant="standard"
        name="password_confirmation"
        type="password"
        fullWidth
        defaultValue={state?.data?.password_confirmation}
        helperText={state?.error?.fieldErrors?.password_confirmation}
        error={!!state?.error?.fieldErrors?.password_confirmation}
      />
      {state?.error?.formErrors?.length! > 0 && (
        <FormHelperText error={!!state?.error?.formErrors}>
          {JSON.stringify(state?.error?.formErrors)}
        </FormHelperText>
      )}
      <LoadingButton type="submit" variant="contained" loading={loading}>
        SIGN UP
      </LoadingButton>
      <Link component={NextLink} href="/shop/signin">
        Already Have Account?
      </Link>
    </Box>
  );
};
export default Singup;
