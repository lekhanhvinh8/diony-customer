import { Box, Typography } from "@mui/material";
import { Cell } from "./footerCategories";

export interface CategoryListProps {
  column: Array<Cell>;
}

export default function CategoryList({ column }: CategoryListProps) {
  return (
    <Box>
      {column.map((cell, cellIndex) => {
        return (
          <Box sx={{ mt: 1 }} key={cellIndex}>
            <Typography color="#484848">{cell.rootCategory.name}</Typography>
            <Box display="flex" flexWrap="wrap">
              {cell.leafs.map((leaf, index) => {
                return (
                  <Box display="flex" key={index}>
                    <Typography fontSize={13} color="#808080">
                      {leaf.name}
                    </Typography>
                    {index !== cell.leafs.length - 1 && (
                      <Typography
                        fontSize={13}
                        color="#808080"
                        sx={{ ml: "5px", mr: "5px" }}
                      >
                        {"|"}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
