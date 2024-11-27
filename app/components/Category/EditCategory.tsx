"use client";
import { Box, FormHelperText, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/types/CategoryType";
import { EditCategoryAction } from "@/actions/Category.action";

const EditCategory = ({ category }: { category: CategoryType }) => {
  const [state, action, loading] = useActionState(EditCategoryAction, null);
  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      router.push("/admin/category");
    }
  }, [state]);
  return (
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
        sx={{ display: "none" }}
        defaultValue={category?.id}
        name="id"
      />

      <TextField
        name="title"
        label="Title"
        variant="standard"
        defaultValue={state?.data?.title || category?.title}
        helperText={state?.error?.fieldErrors?.title}
        error={!!state?.error?.fieldErrors?.title}
      />
      {state?.error?.formErrors.length > 0 && (
        <FormHelperText error>{state?.error?.formErrors}</FormHelperText>
      )}
      <LoadingButton loading={loading} type="submit" variant="contained">
        Edit
      </LoadingButton>
    </Box>
  );
};

export { EditCategory };
