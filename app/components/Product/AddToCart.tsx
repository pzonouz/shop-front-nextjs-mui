import { ProductType } from "@/app/types/ProductType";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const AddToCart = ({ product }: { product: ProductType }) => {
  return (
    <IconButton>
      <AddShoppingCartIcon />
    </IconButton>
  );
};
export { AddToCart };
