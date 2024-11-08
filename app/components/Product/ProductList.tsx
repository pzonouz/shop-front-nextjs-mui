import { ProductType } from "@/app/types/ProductType";
import { Box } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductList = ({ products }: { products: ProductType[] }) => {
  return (
    <Box sx={{ width: "90%", marginX: "auto" }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
};
export { ProductList };
