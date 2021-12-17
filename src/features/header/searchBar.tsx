import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { initializeSearchPage } from "../../app/store/ui/productFilterPage";

export interface ISearchBarProps {}

export default function SearchBar(props: ISearchBarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState("");

  const search = async () => {
    await dispatch(initializeSearchPage(keyword));
    navigate("/search");
  };

  return (
    <Paper
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Tìm kiếm sản phẩm mong muốn"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.currentTarget.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            search();
          }
        }}
      />
      <IconButton
        sx={{ p: "10px" }}
        onClick={() => {
          search();
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
