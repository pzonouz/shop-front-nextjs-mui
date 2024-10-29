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
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductType } from "@/app/types/ProductType";
import { EditProductAction } from "@/actions/product.action";
import { CategoryType } from "@/app/types/CategoryType";

const EditProduct = ({
  product,
  categories,
}: {
  product: ProductType;
  categories: CategoryType[];
}) => {
  const [state, action, loading] = useActionState(EditProductAction, null);
  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      router.push("/admin/product");
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
        defaultValue={product?.id}
        name="id"
      />

      <TextField
        name="title"
        label="Title"
        variant="standard"
        defaultValue={state?.data?.title || product?.title}
        helperText={state?.error?.fieldErrors?.title}
        error={!!state?.error?.fieldErrors?.title}
      />
      <TextField
        name="description"
        label="Description"
        variant="standard"
        defaultValue={state?.data?.description || product?.description}
        helperText={state?.error?.fieldErrors?.description}
        error={!!state?.error?.fieldErrors?.description}
      />
      <TextField
        name="price"
        label="Price"
        variant="standard"
        defaultValue={state?.data?.price || product?.price}
        helperText={state?.error?.fieldErrors?.price}
        error={!!state?.error?.fieldErrors?.price}
      />
      <TextField
        name="quantity"
        label="Quantity"
        variant="standard"
        defaultValue={state?.data?.quantity || product?.quantity}
        helperText={state?.error?.fieldErrors?.quantity}
        error={!!state?.error?.fieldErrors?.quantity}
      />
      <TextField
        name="image"
        label="Image"
        variant="standard"
        defaultValue={state?.data?.image || product?.image}
        helperText={state?.error?.fieldErrors?.image}
        error={!!state?.error?.fieldErrors?.image}
      />
      <FormControl variant="standard" fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          name="category_id"
          defaultValue={
            state?.data?.category_id ||
            product?.category_id ||
            categories[0]?.id
          }
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
        Edit
      </LoadingButton>
    </Box>
  );
};

export { EditProduct };
