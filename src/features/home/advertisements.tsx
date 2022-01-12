import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import { Grid, Stack } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const rigthImage1Url =
  "https://res.cloudinary.com/docbzd7l8/image/upload/v1641615921/382644b33fc42835b0edfb11f203def5_xhdpi_xshkra.png";
const rightImage2Url =
  "https://res.cloudinary.com/docbzd7l8/image/upload/v1641615968/778970c98d3527e1f32bd2a51497f8e2_xhdpi_ikpjmq.png";

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1641616512/1ff9a5f29989d864eb2ae576dd427c81_xxhdpi_k9of0t.png",
  },
  {
    label: "Bird",
    imgPath:
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1636440978/banner5_klj5d9.png",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1641616565/536724910bf560fe6cb8c3984ba8f42d_xxhdpi_fukhcp.png",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1636440978/banner4_goxgpt.png",
  },
  {
    label: "image",
    imgPath:
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1641616593/8c41dfbac5340cef175fb793b24d86c3_xxhdpi_r872o7.jpg",
  },
  {
    label: "image",
    imgPath:
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1641616613/7d8291c3c5b6a4b5861ddd5bb1805002_xxhdpi_qlvpkz.png",
  },
];

export interface AdvertisementsProps {}

export default function Advertisements(props: AdvertisementsProps) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid xs={8} item>
          <Box>
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images.map((step, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        height: 255,
                        display: "block",
                        overflow: "hidden",
                        maxWidth: 823,
                      }}
                      src={step.imgPath}
                      alt={step.label}
                    />
                  ) : null}
                </Box>
              ))}
            </AutoPlaySwipeableViews>
          </Box>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Grid>
        <Grid item xs={4}>
          <Stack>
            <img
              src={rigthImage1Url}
              alt={"Error"}
              style={{
                maxWidth: 398,
                height: 115,
              }}
            />
            <img
              src={rightImage2Url}
              alt="Error"
              style={{
                maxWidth: 389,
                marginTop: 25,
                height: 115,
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
