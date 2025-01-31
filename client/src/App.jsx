import { createElement, useEffect, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from "react-router-dom";
import { ScrollToTop } from "./shared/SharedComponents";

import GLTheme from "./theme";
import { AskForEmailModal } from "./pages/EmailsPage/components";
import { Four04Page } from "./pages/Four04Page";
import { useDispatch, useSelector } from "react-redux";
import { handleTokenRefresh } from "./api/axiosInstance";
import * as API from "./api";
import { adminRoutes, privateRoutes, routes } from "./utils/helpers/routes";
import UpdateNotifier from "./shared/SharedComponents/UpdateNotifier";
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
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

const CustomRedirect = ({ from, to }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === from) {
      navigate(to + location.hash, { replace: true });
    }
  }, [location, navigate, from, to]);

  return null;
};

const LoadingFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <GLLoading />
  </div>
);

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
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route
                path="/collections/all/products/helios_gloveset"
                element={
                  <CustomRedirect from="/collections/all/products/helios_gloveset" to="/products/helios_gloveset" />
                }
              />

              {privateRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  element={
                    <ProtectedRoute>
                      {route.element === "PlaceOrderPage" ? (
                        <PlaceOrderLayout>
                          <Suspense fallback={<LoadingFallback />}>
                            {createElement(
                              PrivateComponents[route.element] ||
                                (() => (
                                  <div>
                                    {"Component not found "}
                                    {route.element}{" "}
                                  </div>
                                ))
                            )}
                          </Suspense>
                        </PlaceOrderLayout>
                      ) : (
                        <MainLayout>
                          <Suspense fallback={<LoadingFallback />}>
                            {createElement(
                              PrivateComponents[route.element] ||
                                (() => (
                                  <div>
                                    {"Component not found "}
                                    {route.element}{" "}
                                  </div>
                                ))
                            )}
                          </Suspense>
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
                        <Suspense fallback={<LoadingFallback />}>
                          {createElement(
                            AdminComponents[route.element] ||
                              (() => (
                                <div>
                                  {"Component not found "}
                                  {route.element}{" "}
                                </div>
                              ))
                          )}
                        </Suspense>
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
                        <Suspense fallback={<LoadingFallback />}>
                          {createElement(
                            Components[route.element] ||
                              (() => (
                                <div>
                                  {"Component not found "}
                                  {route.element}{" "}
                                </div>
                              ))
                          )}
                        </Suspense>
                      </PlaceOrderLayout>
                    ) : (
                      <MainLayout>
                        <Suspense fallback={<LoadingFallback />}>
                          {createElement(
                            Components[route.element] ||
                              (() => (
                                <div>
                                  {"Component not found "}
                                  {route.element}{" "}
                                </div>
                              ))
                          )}
                        </Suspense>
                      </MainLayout>
                    )
                  }
                />
              ))}

              <Route
                path="/"
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
          </Suspense>
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

export default App;
