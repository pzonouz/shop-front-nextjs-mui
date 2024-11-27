"use server";
import { ProductType } from "@/types/ProductType";
import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import Image from "next/image";
import { AddToCart } from "../Cart/AddToCart";

const ProductDetail = async ({ product }: { product: ProductType }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", marginY: "3rem" }}>
        {product?.title}
      </Typography>
      <ImageList
        sx={{ width: "100%", maxHeight: "20rem" }}
        cols={2}
        rowHeight={164}
      >
        {product?.images.map((item) => (
          <ImageListItem key={item.id}>
            <Image
              fill
              src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}/${item.path}`}
              alt={item.id}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box>
        <AddToCart product={product} />
      </Box>
      <Box sx={{ marginTop: "2rem" }}>{product?.description}</Box>
    </Box>
  );
};
export { ProductDetail };
