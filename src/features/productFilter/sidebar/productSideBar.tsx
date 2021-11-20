import { Divider, Stack, Box } from "@mui/material";
import { Category } from "../../../app/models/category";
import SideBarCategories from "./sideBarCategories";

export interface CategorySideBarProps {
  categories: Array<Category> | null;
}

const ProductSideBar = ({ categories }: CategorySideBarProps) => {
  return (
    <Box>
      <Stack divider={<Divider flexItem />} spacing={2}>
        {categories && categories.length !== 0 && (
          <SideBarCategories categories={categories} />
        )}
        <div>XYZ</div>
      </Stack>
    </Box>
  );
};

export default ProductSideBar;
