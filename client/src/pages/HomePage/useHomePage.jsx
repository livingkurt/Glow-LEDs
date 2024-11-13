import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { openLoginModal } from "../../slices/userSlice";
import { showSuccess } from "../../slices/snackbarSlice";
import * as API from "../../api";
import { useDispatch } from "react-redux";

const useHomePage = () => {
  const dispatch = useDispatch();
  const { data: currentContent, isLoading } = API.useCurrentContentQuery();
  const modules = currentContent?.home_page?.modules;

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const register = searchParams.get("register");
    const login = searchParams.get("login");
    const token = searchParams.get("token");
    if (token) {
      dispatch(openLoginModal({ token }));
    } else if (register === "true") {
      dispatch(openLoginModal({ register: true }));
    } else if (login === "true") {
      dispatch(openLoginModal());
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    if (code) {
      sessionStorage.setItem("promo_code", code);
      dispatch(showSuccess({ message: `Code ${code} Added to Checkout` }));
    }
  }, [dispatch]);

  return {
    modules,
    isLoading,
  };
};

export default useHomePage;
