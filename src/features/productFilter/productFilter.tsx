import { Box, Grid } from "@mui/material";
import { Category } from "../../app/models/category";
import { ProductCard } from "../../app/models/productCard";
import ProductArea from "./productArea/productArea";
import ProductSideBar from "./sidebar/productSideBar";

export interface ProductFilterProps {
  categories: Array<Category>;
  products: Array<ProductCard>;
}

export default function ProductFilter({
  categories,
  products,
}: ProductFilterProps) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <Box sx={{ padding: 2, bgcolor: "#ffffff" }}>
          <ProductSideBar categories={categories} />
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Box sx={{ padding: 2, bgcolor: "#ffffff" }}>
          <Box sx={{ marginTop: 2 }}>
            <ProductArea products={products} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
