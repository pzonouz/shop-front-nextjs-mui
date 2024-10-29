import { ProductType } from "@/app/types/ProductType";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { AddProduct } from "@/app/components/Product/AddProduct";

const page = async () => {
  const resProducts = await fetch(`${process.env.BACKEND_URL}/product/`);
  const products: ProductType[] = await resProducts.json();

  const resCategories = await fetch(`${process.env.BACKEND_URL}/category/`);
  const categories = await resCategories.json();
  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ textAlign: "center", marginTop: "1rem" }} variant="h4">
        Prodcuts
      </Typography>
      <AddProduct categories={categories} />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {products?.map((product) => {
          return (
            <ListItem
              sx={{ width: "100%" }}
              key={product?.id}
              secondaryAction={
                <Box
                  sx={{
                    display: "flex",
                    gap: "2rem",
                    paddingX: "1rem",
                    flexDirection: "row",
                  }}
                >
                  <IconButton
                    LinkComponent={Link}
                    href={`/admin/product/${product?.id}/edit`}
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    }}
                    edge="end"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    LinkComponent={Link}
                    href={`/admin/product/${product?.id}/delete`}
                    sx={{
                      backgroundColor: "error.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "error.dark",
                      },
                    }}
                    edge="end"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
              disablePadding
            >
              <ListItemButton sx={{ padding: "1rem" }} role={undefined} dense>
                <ListItemText primary={product?.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
export default page;
