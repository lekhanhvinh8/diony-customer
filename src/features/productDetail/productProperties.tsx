import { Box, Grid, Typography } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPath } from "../../app/store/entities/categories";
import { reloadProperties } from "../../app/store/ui/productDetailPage";
import CategoriesPath from "../category/categoriesPath";

export interface PropductPropertiesProps {}

export default function PropductProperties(props: PropductPropertiesProps) {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.ui.productDetailPage);
  const categoriesPath = useAppSelector(getPath(page.productDetail.categoryId));

  useEffect(() => {
    dispatch(reloadProperties(page.productDetail.id));
  }, [dispatch, page.productDetail.id]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Thông tin chi tiết</Typography>
      <Grid container spacing={2} rowSpacing={1} sx={{ marginTop: 2 }}>
        <Grid item xs={2}>
          Danh mục
        </Grid>
        <Grid item xs={10}>
          {categoriesPath && <CategoriesPath path={categoriesPath} />}
        </Grid>

        {page.productSelectProperties.map((property) => {
          return (
            <Fragment key={property.propertyId}>
              <Grid item xs={2}>
                {property.propertyName}
              </Grid>
              <Grid item xs={10}>
                <Typography>{property.values.join(",")}</Typography>
              </Grid>
            </Fragment>
          );
        })}

        {page.productTypingProperties.map((property) => {
          return (
            <Fragment key={property.propertyId}>
              <Grid item xs={2}>
                {property.propertyName}
              </Grid>
              <Grid item xs={10}>
                {property.value}
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    </Box>
  );
}
