"use client";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductType } from "@/app/types/ProductType";
import { EditProductAction } from "@/actions/product.action";
import { CategoryType } from "@/app/types/CategoryType";
import { styled } from "@mui/material/styles";

const EditProduct = ({
  product,
  categories,
}: {
  product: ProductType;
  categories: CategoryType[];
}) => {
  const [state, action, loading] = useActionState(EditProductAction, null);
  const router = useRouter();
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
  // TODO:Image Edit
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
      <ImageList>
        {product?.images.map((item) => (
          <ImageListItem key={item?.id}>
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}/${item?.path}`}
              loading="lazy"
            />
            <ImageListItemBar
              actionIcon={
                <IconButton
                  sx={{
                    color: "error.main",
                    backgroundColor: "white",
                    "&:hover": {
                      color: "error.dark",
                      backgroundColor: "#eeeeee",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
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
