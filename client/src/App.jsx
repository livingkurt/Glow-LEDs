import { createElement, useEffect } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ScrollToTop } from "./shared/SharedComponents";
import { createTheme, ThemeProvider } from "@mui/material";
import GLTheme from "./theme";
import { AskForEmailModal } from "./pages/EmailsPage/components";
import { Four04Page } from "./pages/Four04Page";
import { useDispatch, useSelector } from "react-redux";
import { handleTokenRefresh } from "./api/axiosInstance";
import * as API from "./api";
import { adminRoutes, privateRoutes, redirects, routes } from "./utils/helpers/routes";
import UpdateNotifier from "./shared/SharedComponents/UpdateNotifier";
import { hot } from "react-hot-loader/root";
import { AdminComponents, Components, PrivateComponents } from "./shared/RouteComponents/pages";
import Head from "./shared/RouteComponents/Head";
import GLSnackbar from "./shared/GlowLEDsComponents/GLSnackbar/GLSnackbar";
import GLLoading from "./shared/GlowLEDsComponents/GLLoading/GLLoading";
import GLLoginModal from "./shared/GlowLEDsComponents/GLLoginModal/GLLoginModal";
import ProtectedRoute from "./shared/RouteComponents/ProtectedRoute";
import MainLayout from "./shared/Layouts/MainLayout";
import PlaceOrderLayout from "./shared/Layouts/PlaceOrderLayout";
import GLConfirmModal from "./shared/GlowLEDsComponents/GLConfirmModal/GLConfirmModal";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
  const dispatch = useDispatch();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  useEffect(() => {
    handleTokenRefresh();
  }, [dispatch]);

  useEffect(() => {
    dispatch(API.getEnvironment());
  }, [dispatch]);

  useEffect(() => {
    if (current_user._id) {
      dispatch(API.getCurrentUserCart(current_user._id));
    }
  }, [dispatch, current_user._id]);

  const theme = createTheme(GLTheme);

  return (
    <ThemeProvider theme={theme}>
      <Head />
      <Router>
        <ScrollToTop>
          <Routes>
            {redirects.map(({ from, to }) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            {privateRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={
                  <ProtectedRoute>
                    {route.element === "PlaceOrderPage" ? (
                      <PlaceOrderLayout>
                        {createElement(
                          PrivateComponents[route.element] || (() => <div>Component not found {route.element} </div>)
                        )}
                      </PlaceOrderLayout>
                    ) : (
                      <MainLayout>
                        {createElement(
                          PrivateComponents[route.element] || (() => <div>Component not found {route.element} </div>)
                        )}
                      </MainLayout>
                    )}
                  </ProtectedRoute>
                }
              />
            ))}

            {adminRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={
                  <ProtectedRoute isAdminRoute={true}>
                    <MainLayout>
                      {createElement(
                        AdminComponents[route.element] || (() => <div>Component not found {route.element} </div>)
                      )}
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
            ))}

            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={
                  route.element === "PlaceOrderPage" ? (
                    <PlaceOrderLayout>
                      {createElement(
                        Components[route.element] || (() => <div>Component not found {route.element} </div>)
                      )}
                    </PlaceOrderLayout>
                  ) : (
                    <MainLayout>
                      {createElement(
                        Components[route.element] || (() => <div>Component not found {route.element} </div>)
                      )}
                    </MainLayout>
                  )
                }
              />
            ))}

            <Route
              path={"/"}
              exact={true}
              element={
                <MainLayout>
                  <HomePage />
                </MainLayout>
              }
            />
            <Route
              element={
                <MainLayout>
                  <Four04Page />
                </MainLayout>
              }
            />
          </Routes>
        </ScrollToTop>
        <AskForEmailModal />
        <UpdateNotifier />
        <GLLoading />
        <GLLoginModal />
      </Router>
      <GLSnackbar />
      <GLConfirmModal />
    </ThemeProvider>
  );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
