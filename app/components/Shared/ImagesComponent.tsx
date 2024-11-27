"use client";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useActionState, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Image from "next/image";
import { ProductType } from "@/types/ProductType";
import { AddImageAction, DeleteImageAction } from "@/actions/Product.action";

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

const ImagesComponent = ({ product }: { product: ProductType }) => {
  const [_, action, loading] = useActionState(AddImageAction, null);
  const [pending, setPending] = useState("");
  return (
    <Box sx={{ width: "100%" }} component="form" action={action}>
      <input name="product_id" type="text" hidden defaultValue={product?.id} />
      <ImageList cols={2} rowHeight={100}>
        {product?.images.map((item) => (
          <ImageListItem key={item?.id}>
            <Image
              fill
              alt={item?.path}
              src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}/${item?.path}`}
              loading="lazy"
            />
            <ImageListItemBar
              actionIcon={
                <IconButton
                  onClick={async () => {
                    setPending(item?.id);
                    await DeleteImageAction(item?.id, product?.id.toString());
                    setPending("");
                  }}
                  sx={{
                    color: "error.main",
                    backgroundColor: "white",
                    "&:hover": {
                      color: "error.dark",
                      backgroundColor: "#eeeeee",
                    },
                  }}
                >
                  {pending == item?.id ? (
                    <CircularProgress color="error" size="1.5rem" />
                  ) : (
                    <DeleteIcon />
                  )}
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Button
        component="label"
        variant="outlined"
        sx={{ marginBottom: "1rem" }}
      >
        Choose Image
        <VisuallyHiddenInput
          name="image"
          type="file"
          accept=".jpg, .png, .jpeg"
        />
      </Button>
      <LoadingButton
        type="submit"
        loading={loading}
        role={undefined}
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload Image
      </LoadingButton>
    </Box>
  );
};

export { ImagesComponent };
