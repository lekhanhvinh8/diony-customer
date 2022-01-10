import { Box, Typography } from "@mui/material";

export interface FooterProductInfoProps {}

export default function FooterProductInfo(props: FooterProductInfoProps) {
  return (
    <Box>
      <Box sx={{ mt: 2 }} display="flex">
        <Box sx={{ width: "20%" }}>
          <Typography fontWeight="bold" fontSize={17}>
            Chăm sóc khách hàng
          </Typography>
        </Box>

        <Box sx={{ width: "20%" }}>
          <Typography fontWeight="bold" fontSize={17}>
            Về Dionys
          </Typography>
        </Box>

        <Box sx={{ width: "20%" }}>
          <Typography fontWeight="bold" fontSize={17}>
            Thanh Toán
          </Typography>
        </Box>

        <Box sx={{ width: "20%" }}>
          <Typography fontWeight="bold" fontSize={17}>
            Theo dõi chúng tôi
          </Typography>
        </Box>

        <Box sx={{ width: "20%" }}>
          <Typography fontWeight="bold" fontSize={17}>
            Tải ứng dụng
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
