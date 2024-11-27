import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import React from "react";
import { AddToCart } from "../Cart/AddToCart";
import { ProductType } from "@/types/ProductType";
import Link from "next/link";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <Card sx={{ maxWidth: 345, marginX: "auto" }}>
      <CardHeader
        sx={{ textDecoration: "none", color: "inherit" }}
        component={Link}
        href={`/shop/product/${product?.id}`}
        title={product?.title}
      />
      <CardMedia
        component="img"
        height="194"
        image={`${process.env.BACKEND_STORAGE}/storage/${product?.images[0].path}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {product?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <AddToCart product={product} />
        <IconButton>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
