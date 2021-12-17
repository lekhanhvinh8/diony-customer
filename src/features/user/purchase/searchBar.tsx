import { Box, Paper, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
export interface SearchBarProps {}

export default function SearchBar(props: SearchBarProps) {
  return (
    <Box>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton type="submit" sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Tìm kiếm theo id đơn hàng"
          fullWidth
        />
      </Paper>
    </Box>
  );
}
