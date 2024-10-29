"use client";
import {
  Box,
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
import { AddProductAction } from "@/actions/product.action";
import { CategoryType } from "@/app/types/CategoryType";

const AddProduct = ({ categories }: { categories: CategoryType[] }) => {
  const [open, setOpen] = useState(false);
  const [state, action, loading] = useActionState(AddProductAction, null);
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
        <TextField
          name="image"
          label="Image"
          variant="standard"
          defaultValue={state?.data?.image}
          helperText={state?.error?.fieldErrors?.image}
          error={!!state?.error?.fieldErrors?.image}
        />
        <FormControl variant="standard" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="category_id"
            defaultValue={state?.data?.categoryId || categories[0]?.id}
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

export { AddProduct };
