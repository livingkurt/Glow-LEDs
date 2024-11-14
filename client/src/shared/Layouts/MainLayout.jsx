import { Cart, Container, Content, Footer, Navbar, Sidebar } from "../../layouts";
import { useEffect, useState } from "react";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../../slices/userSlice";
import { showInfo } from "../../slices/snackbarSlice";

const MainLayout = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const { height, width } = useWindowDimensions();
  const dispatch = useDispatch();
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
      dispatch(showInfo({ message: `Code ${code} Added to Checkout` }));
    }
  }, [dispatch]);

  return (
    <Container setVisible={setVisible} visible={visible}>
      <Navbar visible={visible} />
      <Cart visible={visible} height={height} width={width} />
      <Sidebar />
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
};

export default MainLayout;
