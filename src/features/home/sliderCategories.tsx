import { useAppSelector } from "../../app/hooks";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { red } from "@mui/material/colors";
import defaultCategoryImage from "../../app/layouts/images/defaultCategoryImage.png";

const desktopScreenWidth = window.screen.availWidth;
const scrollBarWidth = 17;
const homeWidth = (desktopScreenWidth - scrollBarWidth) * 0.9;
const maxItems = 10;
const itemWidth = homeWidth / maxItems;
const paddingRight = 5;

const useStyles = makeStyles({
  root: {
    "& .MuiCardContent-root": {
      padding: 3,
      backgroundColor: red,
    },
  },
});

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: maxItems,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export interface SliderCategoriesProps {}

const formatCategoryName = (name: string) => {
  const trimIndex = 24;
  if (name && name.length > 24) {
    const format = name.slice(0, trimIndex - 3);
    return format + "...";
  }

  return name || "undefined";
};

export default function SliderCategories(props: SliderCategoriesProps) {
  const categories = useAppSelector((state) => state.entities.categories);

  const classes = useStyles(props);

  const renderCardList = () => {
    const boxList = [];

    for (let i = 0; i < categories.length; i += 2) {
      const category1 = categories[i];
      const category2 = i + 1 < categories.length ? categories[i + 1] : null;

      boxList.push(
        <Box key={category1.id}>
          <Box
            sx={{
              width: itemWidth,
              paddingRight: `${paddingRight}px`,
              paddingLeft: "0.9px",
              marginBottom: "0.9px",
            }}
          >
            <Card className={classes.root}>
              <CardActionArea component={Link} to={`/cate/${category1.id}`}>
                <CardMedia
                  component="img"
                  height={itemWidth - paddingRight}
                  image={
                    category1.imageUrl
                      ? category1.imageUrl
                      : defaultCategoryImage
                  }
                />
                <CardContent>
                  <Typography sx={{ marginTop: 1 }} height={50} align="center">
                    {formatCategoryName(category1.name)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
          {category2 && (
            <Box
              sx={{
                width: itemWidth,
                paddingRight: `${paddingRight}px`,
                paddingLeft: "0.9px",
                marginBottom: "0.9px",
                marginTop: "5px",
              }}
            >
              <Card className={classes.root}>
                <CardActionArea component={Link} to={`/cate/${category2.id}`}>
                  <CardMedia
                    component="img"
                    height={itemWidth - paddingRight}
                    image={
                      category2.imageUrl
                        ? category2.imageUrl
                        : defaultCategoryImage
                    }
                  />
                  <CardContent>
                    <Typography
                      sx={{ marginTop: 1 }}
                      height={50}
                      align="center"
                    >
                      {formatCategoryName(category2.name)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          )}
        </Box>
      );
    }

    return boxList;
  };

  return (
    <Box>
      <Box sx={{ marginLeft: 2, paddingTop: 2 }}>
        <Typography>DANH MỤC</Typography>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Carousel slidesToSlide={maxItems} responsive={responsive}>
          {renderCardList()}
        </Carousel>
      </Box>
    </Box>
  );
}
