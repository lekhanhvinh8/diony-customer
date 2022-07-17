import {
  Avatar,
  Box,
  Typography,
  Rating,
  Stack,
  Divider,
  Pagination,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  reloadRatings,
  selectRatingPageNumber,
} from "../../app/store/ui/productDetailPage";

export interface ProductRatingsProps {}

export default function ProductRatings(props: ProductRatingsProps) {
  const dispatch = useAppDispatch();
  const ratings = useAppSelector((state) => state.ui.productDetailPage.ratings);
  const product = useAppSelector(
    (state) => state.ui.productDetailPage.productDetail
  );
  const { totalRatings, ratingPageSize, ratingPageNumber } = useAppSelector(
    (state) => state.ui.productDetailPage
  );

  useEffect(() => {
    if (product.id) dispatch(reloadRatings(product.id));
  }, [dispatch, product.id]);

  const totalPages = Math.ceil(totalRatings / ratingPageSize);

  return (
    <Box>
      <Typography variant="h5">Đánh giá sản phẩm</Typography>
      {totalPages > 0 ? (
        <Stack sx={{ mt: 2 }} spacing={2} divider={<Divider />}>
          {ratings.map((rating) => {
            let formatedDate = "Undefine";

            try {
              const date = new Date(rating.createdAt);
              formatedDate = format(date, "MM/dd/yyyy h:mm a");
            } catch (error) {}

            return (
              <Box key={rating.id}>
                <Box display="flex">
                  <Box>
                    <Avatar
                      src={rating.customerAvatarUrl}
                      sx={{ width: 56, height: 56 }}
                    />
                  </Box>
                  <Box sx={{ marginLeft: 2 }}>
                    <Typography>{rating.customerEmail}</Typography>
                    <Rating value={rating.stars} readOnly />

                    <Box sx={{ mt: 1 }}>
                      <Typography>{rating.content}</Typography>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <Typography fontSize={12} color="#808080">
                        {formatedDate}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Stack>
      ) : (
        <Typography>Chưa có đánh giá</Typography>
      )}

      <Box sx={{ width: "100%", mt: 2 }} display="flex" justifyContent="center">
        {totalPages > 0 && (
          <Pagination
            count={totalPages}
            page={ratingPageNumber + 1}
            color="primary"
            siblingCount={2}
            boundaryCount={2}
            onChange={(event: React.ChangeEvent<unknown>, value: number) => {
              dispatch(selectRatingPageNumber(value - 1));
              dispatch(reloadRatings(product.id));
            }}
          />
        )}
      </Box>
    </Box>
  );
}
