import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Categories from "../../features/category/categories";
import { useAppDispatch } from "../hooks";
import { loadCategories } from "../store/entities/categories";
import Home from "../../features/home/home";
import NotFound from "./notfount";
import Login from "../../features/authentication/login";
import Main from "./main";
import Test from "./test";
import ScrollToTop from "./scrollToTop";
import ProductDetail from "../../features/productDetail/productDetail";
import SignUp from "../../features/authentication/signup";
import { setUser } from "../store/user";
import ProtectedRoute from "./common/protectedRoute";
import Cart from "../../features/cart/cart";
import User from "../../features/user/user";
import Account from "../../features/user/account/account";
import Purchase from "../../features/user/purchase/purchase";
import Profile from "../../features/user/account/profile";
import Address from "../../features/user/account/address";

export const cateIdRouteParams = "cateId";
export const productIdRouteParams = "productId";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const asyncFunc = async () => {
      dispatch(setUser);
      await dispatch(loadCategories());
    };

    asyncFunc();
  }, [dispatch]);

  return (
    <Fragment>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path={"/cate/:" + cateIdRouteParams} element={<Categories />}>
          <Route path="" element={<NotFound />} />
        </Route>
        <Route
          path={"/product/:" + productIdRouteParams}
          element={<ProductDetail />}
        />
        <Route path="/cart" element={<ProtectedRoute />}>
          <Route path="" element={<Cart />} />
        </Route>
        <Route path="/user/*" element={<ProtectedRoute />}>
          <Route path="*" element={<User />}>
            <Route path="account/*" element={<Account />}>
              <Route path="profile" element={<Profile />} />
              <Route path="address" element={<Address />} />
            </Route>
            <Route path="purchase/*" element={<Purchase />} />
          </Route>
        </Route>
        <Route path="/test" element={<Test />} />
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
