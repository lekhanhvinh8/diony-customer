import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  InputBase,
  Stack,
  
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getPriceAndQuantity,
  setSelectedQuantity,
} from "../../app/store/ui/productDetailPage";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiButton-root": {
      padding: 0,
    },
    "& .MuiInputBase-input": {
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
      },
    },
  },
});

export interface ProductQuantityProps {}

export default function ProductQuantity(props: ProductQuantityProps) {
  const dispatch = useAppDispatch();
  const { quantity } = useAppSelector(getPriceAndQuantity);
  const selectedQuantity = useAppSelector(
    (state) => state.ui.productDetailPage.selectedQuantity
  );
  const classes = useStyles();

  return (
    <Box sx={{ marginTop: 3 }} className={classes.root}>
      <Grid container>
        <Grid item xs={2}>
          <Box display="flex" alignItems="center" sx={{ height: "100%" }}>
            Số lượng
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Stack direction="row">
            <Box
              sx={{
                width: 150,
              }}
            >
              <ButtonGroup
                disableRipple
                variant="outlined"
                fullWidth
                sx={{ color: "white" }}
              >
                <Button
                  sx={{ width: 100 }}
                  onClick={() => {
                    dispatch(setSelectedQuantity(selectedQuantity - 1));
                  }}
                >
                  -
                </Button>
                <Button fullWidth>
                  <InputBase
                    type="number"
                    sx={{ width: 40 }}
                    inputProps={{ min: 0, style: { textAlign: "center" } }}
                    value={selectedQuantity.toString()}
                    onChange={(e) => {
                      const selectedQuantity = Number(e.currentTarget.value);
                      dispatch(setSelectedQuantity(selectedQuantity));
                    }}
                  />
                </Button>
                <Button
                  sx={{ width: 100 }}
                  onClick={() => {
                    dispatch(setSelectedQuantity(selectedQuantity + 1));
                  }}
                >
                  +
                </Button>
              </ButtonGroup>
            </Box>
            <Box display="flex" alignItems="center" sx={{ paddingLeft: 2 }}>
              {quantity} sản phẩm có sẵn
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
