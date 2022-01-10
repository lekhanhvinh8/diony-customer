import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Categories from "../../features/category/categories";
import { useAppDispatch, useAppSelector } from "../hooks";
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
import Checkout from "../../features/checkout/checkout";
import { initializePage } from "../store/ui/cart";
import { loadCart } from "../store/entities/cart";
import { setCategoriesInit } from "../store/ui/categoryPage";
import Search from "../../features/search/search";
import OrderDetail from "../../features/orderDetail/orderDetail";

export const cateIdRouteParams = "cateId";
export const productIdRouteParams = "productId";
export const orderIdParams = "orderId";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.decodeUser);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        await dispatch(setUser);
        await dispatch(loadCategories());
        await dispatch(setCategoriesInit(true));
      } catch (ex) {}
    };

    asyncFunc();
  }, [dispatch]);

  useEffect(() => {
    const asyncFunc = async () => {
      if (user) {
        await dispatch(loadCart());
        await dispatch(initializePage); //temp, will delete soon
      }
    };

    asyncFunc();
  }, [user, dispatch]);

  return (
    <Fragment>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path={"/cate/:" + cateIdRouteParams} element={<Categories />}>
          <Route path="" element={<NotFound />} />
        </Route>
        <Route path="/search" element={<Search />} />
        <Route
          path={"/product/:" + productIdRouteParams}
          element={<ProductDetail />}
        />
        <Route path="/cart" element={<ProtectedRoute />}>
          <Route path="" element={<Cart />} />
        </Route>
        <Route path="/checkout" element={<ProtectedRoute />}>
          <Route path="" element={<Checkout />} />
        </Route>
        <Route path="/user/*" element={<ProtectedRoute />}>
          <Route path="*" element={<User />}>
            <Route path="account/*" element={<Account />}>
              <Route path="profile" element={<Profile />} />
              <Route path="address" element={<Address />} />
            </Route>
            <Route path="purchase/*" element={<Purchase />} />
            <Route path={"order/:" + orderIdParams} element={<OrderDetail />} />
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
