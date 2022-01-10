import { Box, Typography, Grid } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { Category } from "../../app/models/category";
import { getLeafs } from "../../app/store/entities/categories";
import CategoryList from "./categoryList";

const categoryTotalColumns = 4;
const gridSize = 3; // = 12 / categoryTotalColumns;

export interface Cell {
  rootCategory: Category;
  leafs: Array<Category>;
}

const getLengthOfCateColumn = (cells: Array<Cell>) => {
  let length = 0;

  for (const cell of cells) {
    length += cell.rootCategory.name.length;
    for (const category of cell.leafs) {
      length += category.name.length;
    }
  }

  return length;
};

const getshortestCateColumnIndex = (columns: Array<Array<Cell>>) => {
  if (columns.length === 0) return -1;

  let shortestColumnIndex = 0;
  let shortestColumnLength = getLengthOfCateColumn(columns[0]);

  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];

    const length = getLengthOfCateColumn(column);
    if (length < shortestColumnLength) {
      shortestColumnIndex = i;
      shortestColumnLength = length;
    }
  }

  return shortestColumnIndex;
};

export interface FooterCategoriesProps {}

export default function FooterCategories(props: FooterCategoriesProps) {
  const rootCategories = useAppSelector((state) => state.entities.categories);
  const categoryColumns: Array<Array<Cell>> = [];

  for (let i = 0; i < categoryTotalColumns; i++) {
    const newColumn: Array<Cell> = [];
    categoryColumns.push(newColumn);
  }

  for (const category of rootCategories) {
    const shortestColumnIndex = getshortestCateColumnIndex(categoryColumns);

    const leafs = getLeafs(category);

    if (leafs.length === 1 && leafs[0] === category) {
      leafs.splice(0, leafs.length);
    }

    const newCell: Cell = {
      rootCategory: category,
      leafs: leafs,
    };

    categoryColumns[shortestColumnIndex].push(newCell);
  }


  return (
    <Box>
      <Typography fontWeight="bold" fontSize={17}>
        Danh mục sản phẩm
      </Typography>

      <Grid container>
        {categoryColumns.map((column, index) => {
          return (
            <Grid item xs={gridSize} key={index}>
              <CategoryList column={column} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
