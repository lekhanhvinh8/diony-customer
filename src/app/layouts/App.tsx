import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Categories from "../../features/category/categories";
import { useAppDispatch } from "../hooks";
import { loadCategories } from "../store/entities/categories";
import Home from "../../features/home/home";
import NotFound from "./notfount";
import Login from "../../features/account/login";
import Main from "./main";
import Test from "./test";
import ScrollToTop from "./scrollToTop";

export const cateRouteParams = "cateId";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const asyncFunc = async () => {
      await dispatch(loadCategories());
    };

    asyncFunc();
  }, [dispatch]);

  return (
    <Fragment>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path={"cate/:" + cateRouteParams} element={<Categories />}>
          <Route path="" element={<NotFound />} />
        </Route>
        <Route path="test" element={<Test />} />
        <Route path="/*" element={<Main />}>
          <Route path="" element={<Home />} />
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
