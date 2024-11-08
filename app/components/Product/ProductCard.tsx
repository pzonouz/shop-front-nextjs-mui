import { ProductType } from "@/app/types/ProductType";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import React from "react";
import { AddToCart } from "./AddToCart";

const ProductCard = ({ product }: { product: ProductType }) => {
  const date = new Date(product?.updated_at);
  return (
    <Card sx={{ maxWidth: 345, marginX: "auto" }}>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product?.title}
        subheader={date?.toLocaleString()}
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
