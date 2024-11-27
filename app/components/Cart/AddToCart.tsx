"use client";
import { Box, CircularProgress, Fab, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useActionState, useEffect } from "react";
import { AddToCartAction } from "@/actions/cart.action";
import { ProductType } from "@/types/ProductType";

const AddToCart = ({ product }: { product: ProductType }) => {
  const [state, action, loading] = useActionState(AddToCartAction, null);
  useEffect(() => {
    // TODO:Add sanckbar with alert
  }, [state]);
  return (
    <Box component="form" action={action}>
      <input defaultValue={product?.id} name="product_id" hidden />
      <input defaultValue={1} name="quantity" hidden />
      <input defaultValue={product?.price} name="price" hidden />
      <Box>
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <Fab size="small" type="submit" color="primary" disabled={loading}>
            <AddShoppingCartIcon />
          </Fab>
          {loading && (
            <CircularProgress
              size={40}
              sx={{
                color: "primary.main",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
              }}
            />
          )}
        </Box>
      </Box>

      {/* <IconButton type="submit"> */}
      {/*   {loading ? <CircularProgress size={18} /> : <AddShoppingCartIcon />} */}
      {/* </IconButton> */}
    </Box>
  );
};
export { AddToCart };
