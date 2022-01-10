import { Box, Divider, Typography } from "@mui/material";
import FooterCategories from "./footerCategories";
import FooterProductInfo from "./footerProductInfo";

export interface FooterProps {}

export default function Footer(props: FooterProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ bgcolor: "#ffffff", mt: 2 }}
    >
      <Box sx={{ width: "90%" }}>
        <FooterCategories />
        <Divider sx={{ mt: 2 }} />
        <FooterProductInfo />
        <Divider sx={{ mt: 2 }} />
        <Box sx={{ mt: 2 }}>
          <Box display="flex" justifyContent="center">
            <Typography>
              Địa chỉ văn phòng: Số 28, phường 12, thành phố Thủ Đức, thành phố
              Hồ Chí Minh
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Typography>
              © 2022 Dionys. Tất cả các quyền được bảo lưu.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
