import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Category } from "../../../app/models/category";

export interface SideBarCategoriesProps {
  categories: Array<Category>;
}

export default function SideBarCategories({
  categories,
}: SideBarCategoriesProps) {
  return (
    <Box>
      <Typography variant="h6">Danh mục</Typography>
      <Box sx={{ marginTop: 1 }}>
        {categories?.map((category, index) => (
          <Box key={category.id} sx={{ marginTop: index === 0 ? 0 : 1 }}>
            <Link
              to={`/cate/${category.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {category.name}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
