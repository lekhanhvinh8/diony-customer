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

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1636440978/banner3_vcq11d.jpg",
  },
  {
    label: "Bird",
    imgPath:
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1636440978/banner5_klj5d9.png",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1636440978/baner2_m0v2ix.png",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://res.cloudinary.com/docbzd7l8/image/upload/v1636440978/banner4_goxgpt.png",
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
                  key={step.label}
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
              src={
                "https://res.cloudinary.com/docbzd7l8/image/upload/v1636441540/sbanner1_q1njez.png"
              }
              alt={"Error"}
              style={{
                maxWidth: 418,
                height: 150,
              }}
            />
            <img
              src={
                "https://res.cloudinary.com/docbzd7l8/image/upload/v1636441540/sbanner2_wyj9kf.png"
              }
              alt="Error"
              style={{
                maxWidth: 418,
                marginTop: 3,
                height: 150,
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
