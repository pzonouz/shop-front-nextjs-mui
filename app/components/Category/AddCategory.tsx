"use client";
import { Box, FormHelperText, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useActionState, useEffect, useState } from "react";
import { ModalComponent } from "../Navigation/ModalComponent";
import { AddCategoryAction } from "@/actions/Category.action";

const AddCategory = () => {
  const [open, setOpen] = useState(false);
  const [state, action, loading] = useActionState(AddCategoryAction, null);
  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);
  return (
    <ModalComponent open={open} setOpen={setOpen}>
      <Box
        component="form"
        action={action}
        sx={{
          padding: "2rem",
          width: "80%",
          backgroundColor: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <TextField
          name="title"
          label="Title"
          variant="standard"
          defaultValue={state?.data?.title}
          helperText={state?.error?.fieldErrors?.title}
          error={!!state?.error?.fieldErrors?.title}
        />
        {state?.error?.formErrors.length > 0 && (
          <FormHelperText error>{state?.error?.formErrors}</FormHelperText>
        )}
        <LoadingButton loading={loading} type="submit" variant="contained">
          Add
        </LoadingButton>
      </Box>
    </ModalComponent>
  );
};

export { AddCategory };
