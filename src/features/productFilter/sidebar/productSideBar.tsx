import { Box } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import SideBarCategories from "./sideBarCategories";
import SideBarFilter from "./sideBarFilter";

export interface CategorySideBarProps {}

const ProductSideBar = (props: CategorySideBarProps) => {
  const categories = useAppSelector(
    (state) => state.ui.productFilterPage.categoryChildren
  );

  return (
    <Box>
      <Box>
        {categories && categories.length !== 0 && (
          <SideBarCategories categories={categories} />
        )}

        <SideBarFilter />
      </Box>
    </Box>
  );
};

export default ProductSideBar;
