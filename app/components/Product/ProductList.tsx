import { Box } from "@mui/material";
import ProductCard from "./ProductCard";
import { ProductType } from "@/types/ProductType";

const ProductList = ({ products }: { products: ProductType[] }) => {
  return (
    <Box
      sx={{
        width: "90%",
        marginX: "auto",
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
};
export { ProductList };
