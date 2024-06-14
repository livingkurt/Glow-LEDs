import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { openLoginModal } from "../../slices/userSlice";
import { showSuccess } from "../../slices/snackbarSlice";
import * as API from "../../api";
import { useDispatch } from "react-redux";

const useHomePage = () => {
  const dispatch = useDispatch();
  const { data: currentContent, isLoading } = API.useCurrentContentQuery();

  const slideshow = currentContent?.home_page?.slideshow;
  const featured_products = currentContent?.home_page?.featured_products;
  const learn_more_products = currentContent?.home_page?.learn_more_products;
  const learn_highlights = currentContent?.home_page?.learn_highlights;
  const discover_more = currentContent?.home_page?.discover_more;
  const get_more_out_of = currentContent?.home_page?.get_more_out_of;
  const support_banner = currentContent?.home_page?.support_banner;
  const video = currentContent?.home_page?.video;
  const featured_products_hidden = currentContent?.home_page?.featured_products_hidden;
  const slideshow_hidden = currentContent?.home_page?.slideshow_hidden;
  const video_hidden = currentContent?.home_page?.video_hidden;
  const learn_more_products_hidden = currentContent?.home_page?.learn_more_products_hidden;

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const register = searchParams.get("register");
    const login = searchParams.get("login");
    if (register === "true") {
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
    slideshow,
    featured_products,
    learn_more_products,
    learn_highlights,
    isLoading,
    discover_more,
    get_more_out_of,
    support_banner,
    video,
    featured_products_hidden,
    slideshow_hidden,
    video_hidden,
    learn_more_products_hidden,
  };
};

export default useHomePage;
