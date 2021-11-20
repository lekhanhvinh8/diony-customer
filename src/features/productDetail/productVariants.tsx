import * as React from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Divider,
  Stack,
  Rating,
} from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  calculatePriceAndQuantity,
  getProductDetail,
  resetSelectedQuantity,
  selectVariantValue,
} from "../../app/store/ui/productDetailPage";
import CheckIcon from "@mui/icons-material/Check";

export interface ProductVariantsProps {}

export default function ProductVariants(props: ProductVariantsProps) {
  const product = useAppSelector(getProductDetail);
  const selectedVariantValues = useAppSelector(
    (state) => state.ui.productDetailPage.selectedVariantValues
  );
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ marginTop: 2 }}>
      {product.variants.map((variant) => {
        return (
          <Grid container key={variant.id} sx={{ marginTop: 2 }}>
            <Grid item xs={2}>
              <Box display="flex" alignItems="center" sx={{ height: "100%" }}>
                {variant.name}
              </Box>
            </Grid>
            <Grid item xs={10}>
              <Grid container spacing={1}>
                {variant.values.map((value) => {
                  return (
                    <Grid item key={value.id} xs={2}>
                      <Button
                        variant="outlined"
                        sx={{ width: "100%" }}
                        endIcon={
                          selectedVariantValues
                            .map((s) => s.variantValueId)
                            .includes(value.id) ? (
                            <CheckIcon />
                          ) : null
                        }
                        color={
                          selectedVariantValues
                            .map((s) => s.variantValueId)
                            .includes(value.id)
                            ? "success"
                            : "info"
                        }
                        onClick={() => {
                          dispatch(selectVariantValue(variant.id, value.id));
                          dispatch(calculatePriceAndQuantity);
                          dispatch(resetSelectedQuantity);
                        }}
                      >
                        {value.name}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
}
