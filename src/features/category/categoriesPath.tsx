import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Category } from "../../app/models/category";
import { Link } from "react-router-dom";

export interface CategoriesPathProps {
  path: Array<Category>;
}

export default function CategoriesPath(props: CategoriesPathProps) {
  let breadcrumbs = props.path.map((category) => {
    return (
      <Link
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
        key={category.id}
        to={`/cate/${category.id}`}
      >
        {category.name}
      </Link>
    );
  });

  breadcrumbs = [
    <Link
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
      key="Home"
      to="/"
    >
      Trang chủ
    </Link>,
    ...breadcrumbs,
  ];

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}
