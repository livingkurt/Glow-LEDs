import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, useMediaQuery, useTheme, Container } from "@mui/material";
import { listContents } from "../../api";
import { setSideNavDrawer } from "../../slices/cartSlice";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { navItems } from "./headerHelpers";
import Banner from "./components/Banner";
import RightNavButtons from "./components/RightNavButtons";
import SearchBar from "./components/SearchBar";
import Environment from "./components/Environment";
import HeaderButton from "./components/CenterNavButtons/components/HeaderButton";
import HeaderColumn from "./components/CenterNavButtons/components/HeaderColumn";
import HeaderDrawer from "./components/CenterNavButtons/components/HeaderDrawer";
import HeaderSubDrawer from "./components/CenterNavButtons/components/HeaderSubDrawer";

const Header = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(listContents({ active: true }));
    }
    return () => {
      clean = false;
    };
  }, [dispatch]);

  return (
    <AppBar position="static" color="transparent" elevation={5}>
      <Environment />
      <Banner />
      <Toolbar
        sx={{
          padding: theme.spacing(1, 2),
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {isTablet && (
            <GLButton onClick={() => dispatch(setSideNavDrawer(true))} aria-label="Sidebar" sx={{ fontSize: "30px" }}>
              <Box>
                <Box>
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      width: "25px",
                      height: "3px",
                      backgroundColor: "currentColor",
                      marginBottom: "5px",
                    }}
                  />
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      width: "25px",
                      height: "3px",
                      backgroundColor: "currentColor",
                      marginBottom: "5px",
                    }}
                  />
                  <Box
                    component="span"
                    sx={{ display: "block", width: "25px", height: "3px", backgroundColor: "currentColor" }}
                  />
                </Box>
              </Box>
            </GLButton>
          )}
          <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="center">
              <Link
                to="/"
                aria-label="Home Page"
                style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
              >
                <Box
                  component="img"
                  sx={{ width: 50, marginRight: 1 }}
                  src="/images/optimized_images/logo_images/glow_leds_text_logo.png"
                  alt="Glow LEDs Logo"
                  title="Big Logo"
                />
                {/* <Typography variant="glow_leds" sx={{ fontSize: "24px", color: "white" }}>
                  Glow LEDs
                </Typography> */}
              </Link>
            </Box>

            {!isTablet && (
              <Box display="flex" alignItems="center" justifyContent="center" flexGrow={1}>
                {navItems.map(item => (
                  <div key={item.name} className="header-center-dropdown-container">
                    <HeaderButton to={item.path} ariaLabel={item.ariaLabel}>
                      {item.name}
                    </HeaderButton>
                    {item.columns && (
                      <div className="header-center-dropdown hover_fade_in">
                        <div className="jc-c">
                          <HeaderColumn columns={item.columns} />
                          <HeaderDrawer columns={item.columns} />
                          <HeaderSubDrawer columns={item.columns} />
                          <HeaderColumn columns={item.otherColumns} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </Box>
            )}
          </Box>

          <Box display="flex" alignItems="center">
            <SearchBar />
            <RightNavButtons />
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
