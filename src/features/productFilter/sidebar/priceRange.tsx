import {
  Box,
  InputBase,
  Paper,
  Typography,
  Divider,
  Button,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { applyPriceRange } from "../../../app/store/ui/productFilterPage";

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-input": {
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
      },
    },
  },
});

export interface PriceRangeProps {}

export default function PriceRange(props: PriceRangeProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");

  return (
    <Box className={classes.root}>
      <Typography fontSize={17}>Theo khoảng giá</Typography>
      <Box sx={{ mt: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              width: "40%",
            }}
            variant="outlined"
          >
            <InputBase
              sx={{ height: "30px", paddingLeft: "4px" }}
              inputProps={{ style: { fontSize: 13 } }}
              placeholder="Từ"
              type="number"
              value={fromPrice}
              onChange={(e) => {
                setFromPrice(e.currentTarget.value);
              }}
            />
          </Paper>
          <Box width="10%">
            <Divider />
          </Box>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              width: "40%",
            }}
            variant="outlined"
          >
            <InputBase
              sx={{ height: "30px", paddingLeft: "4px" }}
              inputProps={{ style: { fontSize: 13, appearance: "none" } }}
              placeholder="Đến"
              type="number"
              value={toPrice}
              onChange={(e) => {
                setToPrice(e.currentTarget.value);
              }}
            />
          </Paper>
        </Box>
        <Box sx={{ width: "100%", mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={() => {
              dispatch(
                applyPriceRange(
                  fromPrice ? Number(fromPrice) : null,
                  toPrice ? Number(toPrice) : null
                )
              );
            }}
          >
            Áp dụng
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
