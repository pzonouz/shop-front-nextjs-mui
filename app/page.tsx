import { Box } from "@mui/material";
import { ProductList } from "./components/Product/ProductList";

export default async function Home() {
  const resProdcut = await fetch(`${process.env.BACKEND_URL}/product`);
  const products = await resProdcut.json();
  return (
    <Box sx={{ width: "100%", marginTop: "2rem" }}>
      <ProductList products={products} />
    </Box>
  );
}
