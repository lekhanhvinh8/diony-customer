import { Box } from "@mui/material";
import * as React from "react";
import Carousel from "react-multi-carousel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getProductDetail,
  selectImageUrl,
} from "../../app/store/ui/productDetailPage";
import { desktopWidth, scrollBarWidth } from "../../config.json";

const paddingImage = 30;
const imageWidth =
  (desktopWidth - scrollBarWidth) * 0.9 * (5 / 12) - paddingImage * 2;

const maxItems = 5;
const itemWidth = imageWidth / maxItems;
const itemPaddingRight = 5;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: maxItems,
  },
};

export interface ProductImagesProps {}

export default function ProductImages(props: ProductImagesProps) {
  const selectedImageUrl = useAppSelector(
    (state) => state.ui.productDetailPage.selectedImageUrl
  );
  const { imageUrls, avatarUrl } = useAppSelector(getProductDetail);
  const dispatch = useAppDispatch();

  const renderSliderImages = () => {
    const urls = [avatarUrl, ...imageUrls];

    return urls.map((url, index) => {
      return (
        <Box
          key={index}
          style={{
            width: "100%",
            height: itemWidth,
            paddingRight: itemPaddingRight,
            paddingBottom: itemPaddingRight,
          }}
        >
          <Box
            sx={{
              border: url === selectedImageUrl ? 2 : 0,
              borderColor: "blue",
              width: "100%",
              height: "100%",
            }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                dispatch(selectImageUrl(url));
              }}
            >
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                src={url}
              />
            </a>
          </Box>
        </Box>
      );
    });
  };

  return (
    <Box
      style={{
        padding: paddingImage,
      }}
    >
      <Box
        style={{
          maxWidth: "100%",
          height: imageWidth,
        }}
      >
        <img
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          src={selectedImageUrl}
        />
      </Box>

      <Box
        style={{
          maxWidth: "100%",
          marginTop: 20,
          height: itemWidth,
        }}
      >
        <Carousel slidesToSlide={maxItems} responsive={responsive}>
          {renderSliderImages()}
        </Carousel>
      </Box>
    </Box>
  );
}
