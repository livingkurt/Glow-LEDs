import { createElement, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header, Container, Content, Footer, Sidebar, Cart } from "./shared/ContainerComponents/index";
import { AdminRoute, PrivateRoute } from "./shared/RouteComponents";
import { ScrollToTop } from "./shared/SharedComponents";
import useWindowDimensions from "./shared/Hooks/windowDimensions";
import { isBrowser } from "react-device-detect";
import Headroom from "react-headroom";
import { createTheme, ThemeProvider } from "@mui/material";
import GLTheme from "./theme";
import { EmailModal } from "./pages/EmailsPage/components";
import { Four04Page } from "./pages/Four04Page";
import { useDispatch, useSelector } from "react-redux";
import { handleTokenRefresh } from "./api/axiosInstance";
import * as API from "./api";
import { HomePage } from "./pages/HomePage";
import { adminRoutes, privateRoutes, routes } from "./utils/helpers/routes";
import UpdateNotifier from "./shared/SharedComponents/UpdateNotifier";
import { hot } from "react-hot-loader/root";
import { AdminComponents, Components, PrivateComponents } from "./shared/RouteComponents/pages";
import Head from "./shared/RouteComponents/Head";

const App = () => {
  const dispatch = useDispatch();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    handleTokenRefresh();
  }, [dispatch]);

  useEffect(() => {
    if (current_user._id) {
      dispatch(API.getCurrentUserCart(current_user._id));
    }
  }, [dispatch, current_user._id]);

  const { height, width } = useWindowDimensions();

  const theme = createTheme(GLTheme);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container setVisible={setVisible} visible={visible}>
          {/* <Head /> */}
          {isBrowser && width > 1158 && height > 900 ? (
            <Headroom>
              <Header visible={visible} />
            </Headroom>
          ) : (
            <Header visible={visible} />
          )}
          <Sidebar />
          <Cart visible={visible} height={height} width={width} />
          <Content>
            <ScrollToTop>
              <Routes>
                {privateRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    element={<PrivateRoute>{createElement(PrivateComponents[route.element])}</PrivateRoute>}
                  />
                ))}
                {adminRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    element={<AdminRoute>{createElement(AdminComponents[route.element])}</AdminRoute>}
                  />
                ))}

                <Route path={"/"} exact={true} element={<HomePage />} />
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    element={createElement(Components[route.element])}
                  />
                ))}
                <Route element={<Four04Page />} />
              </Routes>
            </ScrollToTop>
          </Content>
          <Footer />
          <EmailModal />
          <UpdateNotifier />
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
