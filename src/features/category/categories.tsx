import { Box, Grid } from "@mui/material";
import { Link, Outlet, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { cateRouteParams } from "../../app/layouts/App";
import {
  getChildrenOfCateId,
  getPath,
} from "../../app/store/entities/categories";
import CategoriesPath from "./categoriesPath";
import ProductSideBar from "../ProductSideBar/productSideBar";
import ElevationHeader from "../../app/layouts/elevationHeader";

export interface CategoriesProps {}

export default function Categories(props: CategoriesProps) {
  const { [cateRouteParams]: cateId } = useParams();
  const children = useAppSelector(getChildrenOfCateId(Number(cateId)));
  const path = useAppSelector(getPath(Number(cateId)));

  const products = [...Array(100)];

  return (
    <Box>
      <ElevationHeader disableElevation />
      {!children ? (
        <Outlet />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ bgcolor: "#f7f5f5" }}
        >
          <Box sx={{ width: "90%" }}>
            <Box sx={{ marginTop: 2 }}>
              {path && <CategoriesPath path={path} />}
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <Box sx={{ padding: 2, bgcolor: "#ffffff" }}>
                    <ProductSideBar categories={children} />
                  </Box>
                </Grid>
                <Grid item xs={10}>
                  <Box sx={{ padding: 2, bgcolor: "#ffffff" }}>
                    <Box sx={{ marginTop: 2 }}>
                      {products.map((p, index) => (
                        <div key={index}>
                          <Link to="/">ABC</Link>
                        </div>
                      ))}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
