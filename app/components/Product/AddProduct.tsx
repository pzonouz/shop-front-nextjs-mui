"use client";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useActionState, useEffect, useState } from "react";
import { ModalComponent } from "../Navigation/ModalComponent";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CategoryType } from "@/types/CategoryType";
import { AddProductAction } from "@/actions/Product.action";
const AddProduct = ({ categories }: { categories: CategoryType[] }) => {
  const [open, setOpen] = useState(false);
  const [state, action, loading] = useActionState(AddProductAction, null);
  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
        <TextField
          name="description"
          label="Description"
          variant="standard"
          defaultValue={state?.data?.description}
          helperText={state?.error?.fieldErrors?.description}
          error={!!state?.error?.fieldErrors?.description}
        />
        <TextField
          name="price"
          label="Price"
          variant="standard"
          defaultValue={state?.data?.price}
          helperText={state?.error?.fieldErrors?.price}
          error={!!state?.error?.fieldErrors?.price}
        />
        <TextField
          name="quantity"
          label="Quantity"
          variant="standard"
          defaultValue={state?.data?.quantity}
          helperText={state?.error?.fieldErrors?.quantity}
          error={!!state?.error?.fieldErrors?.quantity}
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload Image
          <VisuallyHiddenInput name="image" type="file" />
        </Button>
        <FormControl variant="standard" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="category_id"
            defaultValue={state?.data?.title || categories[0]?.id}
            label="Category"
          >
            {categories?.map((category) => {
              return (
                <MenuItem value={category?.id} key={category?.id}>
                  {category?.title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {state?.error?.formErrors?.length! > 0 && (
          <FormHelperText error>{state?.error?.formErrors}</FormHelperText>
        )}
        <LoadingButton loading={loading} type="submit" variant="contained">
          Add
        </LoadingButton>
      </Box>
    </ModalComponent>
  );
};

export { AddProduct };
