import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsProductBundle } from "../../api";

const useProductBundlePage = () => {
  const dispatch = useDispatch();
  const { pathname } = useParams();

  const cartPage = useSelector(state => state.carts.cartPage);
  const { bundle, my_cart } = cartPage;
  const { current_user } = useSelector(state => state.users.userPage);
  const loading = useSelector(state => state.carts.loading);

  useEffect(() => {
    dispatch(detailsProductBundle(pathname));
  }, [dispatch, pathname]);

  return { bundle, current_user, my_cart, loading };
};

export default useProductBundlePage;
