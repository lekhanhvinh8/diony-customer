import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  InputBase,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import {
  rate,
  setRatingDialogOpen,
  setRatingItemContent,
  setRatingItemStars,
} from "../../app/store/ui/orderDetailPage";
import { cut } from "../../app/utils/stringCutter";

export interface RatingDialogProps {}

export default function RatingDialog(props: RatingDialogProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dialogOpen = useAppSelector(
    (state) => state.ui.orderDetailPage.ratingDialogOpen
  );

  const ratingItems = useAppSelector(
    (state) => state.ui.orderDetailPage.ratingItems
  );

  return (
    <Box>
      <Dialog
        open={dialogOpen}
        onClose={() => dispatch(setRatingDialogOpen(false))}
      >
        <DialogTitle>Đánh giá đơn hàng</DialogTitle>
        <DialogContent>
          {ratingItems.map((ratingItem) => {
            return (
              <Box key={ratingItem.itemId}>
                <Box>
                  <Grid container sx={{ mt: 2 }}>
                    <Grid item xs={2} display="flex" justifyContent="left">
                      <Box style={{ width: 60, height: 60, border: 10 }}>
                        <img
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                          src={ratingItem.productImageUrl}
                          alt="alt"
                        ></img>
                      </Box>
                    </Grid>
                    <Grid item xs={10}>
                      <Box>
                        <Typography>
                          {cut(ratingItem.productName, 60)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Rating
                    name="simple-controlled"
                    value={ratingItem.stars}
                    onChange={(event, newValue) => {
                      if (newValue)
                        dispatch(
                          setRatingItemStars(newValue, ratingItem.itemId)
                        );
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    placeholder="Nhập đánh giá của bạn"
                    multiline
                    maxRows={4}
                    fullWidth
                    value={ratingItem.content}
                    onChange={(e) => {
                      dispatch(
                        setRatingItemContent(e.target.value, ratingItem.itemId)
                      );
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(setRatingDialogOpen(false))}>
            Trở về
          </Button>
          <Button
            onClick={async () => {
              dispatch(rate(ratingItems));
              dispatch(setRatingDialogOpen(false));
            }}
          >
            Hoàn thành
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
