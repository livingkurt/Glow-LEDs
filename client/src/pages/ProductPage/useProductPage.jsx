import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsProductPage } from "./productPageSlice";
import { updateRecentlyViewed } from "./productHelpers";

const useProductPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProductPage({ pathname: params.pathname }));
  }, [dispatch, params.pathname]);

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const productPage = useSelector(state => state.products.productPage);
  const { customizedProduct, productPageLoading, product } = productPage;

  useEffect(() => {
    updateRecentlyViewed(product);
  }, [dispatch, product]);

  return { customizedProduct, current_user, my_cart, productPageLoading, product };
};

export default useProductPage;
