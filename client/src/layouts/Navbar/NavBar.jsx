import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Collapse,
} from "@mui/material";
import { Search, ShoppingCart } from "@mui/icons-material";
import { listContents } from "../../api";
import { setCartDrawer, setSideNavDrawer } from "../../slices/cartSlice";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { navItems, determineDropdown, determineName, rightNav } from "./navbarHelpers";
import Banner from "./components/Banner";
import Environment from "./components/Environment";
import NavbarButton from "./components/NavbarButton";
import NavbarColumn from "./components/NavbarColumn";
import NavbarDrawer from "./components/NavbarDrawer";
import NavbarSubDrawer from "./components/NavbarSubDrawer";
import ColumnItemButton from "./components/ColumnItemButton";
import { debounce } from "lodash";
import { setSearch } from "../../pages/ProductsGridPage/productsGridPageSlice";
import { set_first_name } from "../../slices/userSlice";
import { flagState, getCartQuantity } from "../../helpers/sharedHelpers";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import * as API from "../../api";
import useFeatureFlags from "../../shared/Hooks/useFeatureFlags";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isTabletDown = useMediaQuery(theme.breakpoints.down("md"));
  const isTabletUp = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { search } = useSelector(state => state.products.productsGridPage);
  const [localSearch, setLocalSearch] = useState(search);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const activeFlags = useFeatureFlags();

  const debouncedSearch = useCallback(
    debounce(searchTerm => {
      dispatch(setSearch(searchTerm));
      navigate(`/products?search=${searchTerm}`);
    }, 300),
    [dispatch, navigate]
  );

  const handleSearchChange = event => {
    const searchTerm = event.target.value;
    setLocalSearch(searchTerm);
    debouncedSearch(searchTerm);
  };

  const handleSearchSubmit = () => {
    dispatch(setSearch(localSearch));
    navigate(`/products?search=${localSearch}`);
    setIsSearchOpen(false);
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(listContents({ active: true }));
    }
    return () => {
      clean = false;
    };
  }, [dispatch]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const location = useLocation();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const { cartItems } = my_cart;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (current_user) {
        dispatch(set_first_name(current_user.first_name));
      }
    }
    return () => (clean = false);
  }, [current_user, dispatch]);

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#333333" }} elevation={5}>
      <Environment />
      <Banner />
      <Toolbar sx={{ padding: theme.spacing(1, 2) }}>
        <Container
          disableGutters
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{
              flexShrink: 0,
              minWidth: isLargeScreen ? "200px" : isMediumScreen ? "150px" : "120px",
            }}
          >
            {isTabletDown && (
              <GLButton
                className="side-bar-open p-10px"
                onClick={() => dispatch(setSideNavDrawer(true))}
                aria-label="Sidebar"
                style={{ fontSize: "30px !important", marginRight: "10px" }}
              >
                <div className="box">
                  <div className="head-btn not-active">
                    <span className="span" />
                    <span className="span" />
                    <span className="span" />
                  </div>
                </div>
              </GLButton>
            )}
            <Link
              to="/"
              aria-label="Home Page"
              style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
            >
              <Box
                component="img"
                sx={{
                  width: 50,
                  marginRight: 1,
                }}
                src="/images/optimized_images/logo_images/glow_leds_text_logo.png"
                alt="Glow LEDs Logo"
                title="Big Logo"
              />
              <Typography
                variant="glow_leds"
                sx={{
                  fontSize: isLargeScreen ? "24px" : "20px",
                  color: "white",
                  whiteSpace: "nowrap",
                }}
              >
                Glow LEDs
              </Typography>
            </Link>
          </Box>

          {!isTabletDown && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                flexGrow: 1,
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
                mx: 2,
              }}
            >
              {navItems.map(item => (
                <div key={item.name} className="navbar-center-dropdown-container">
                  <NavbarButton
                    to={item.path}
                    ariaLabel={item.ariaLabel}
                    sx={{
                      fontSize: isLargeScreen ? "16px" : "14px",
                      px: isLargeScreen ? 2 : 1,
                    }}
                  >
                    {item.name}
                  </NavbarButton>
                  {item.columns && (
                    <div className="navbar-center-dropdown hover_fade_in">
                      <div className="jc-c">
                        <NavbarColumn columns={item.columns} />
                        <NavbarDrawer columns={item.columns} />
                        <NavbarSubDrawer columns={item.columns} />
                        <NavbarColumn columns={item.otherColumns} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </Box>
          )}

          <Box
            display="flex"
            alignItems="center"
            sx={{
              flexShrink: 0,
              minWidth: isLargeScreen ? "200px" : isMediumScreen ? "150px" : "120px",
              justifyContent: "flex-end",
            }}
          >
            <GLIconButton
              onClick={toggleSearch}
              sx={{
                transition: "transform ease-in-out 0.3s",
                "&:hover": {
                  backgroundColor: theme.palette.grey[800],
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Search sx={{ fontSize: isLargeScreen ? "22px" : "18px" }} color="white" />
            </GLIconButton>
            <GLIconButton
              onClick={() => dispatch(setCartDrawer(true))}
              sx={{
                display: "flex",
                transition: "transform ease-in-out 0.3s",
                "&:hover": {
                  backgroundColor: theme.palette.grey[800],
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
                },
                alignItems: "center",
              }}
            >
              <ShoppingCart sx={{ fontSize: isLargeScreen ? "22px" : "18px" }} color="white" />
              <Box
                component="span"
                sx={{ marginLeft: "1px", color: "white", fontSize: isLargeScreen ? "14px" : "12px" }}
              >
                {getCartQuantity(cartItems)}
              </Box>
            </GLIconButton>
            {isTabletUp &&
              rightNav(dispatch).map(
                (item, index) =>
                  item.permissions(current_user) && (
                    <div key={index} className="dropdown">
                      <GLIconButton
                        ariaLabel={item.ariaLabel}
                        onClick={() => item.onClick && item.onClick(current_user)}
                        sx={{
                          transition: "transform ease-in-out 0.3s",
                          "&:hover": {
                            backgroundColor: theme.palette.grey[800],
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
                          },
                        }}
                      >
                        {determineName(item, current_user)}
                      </GLIconButton>
                      {current_user && current_user.first_name && determineDropdown(item, current_user) && (
                        <ul className="dropdown-content hover_fade_in w-175px">
                          {item.columns.map((column, colIndex) => (
                            <div key={colIndex}>
                              {column.rows.map((row, rowIndex) => (
                                <ColumnItemButton
                                  key={rowIndex}
                                  ariaLabel={row.ariaLabel}
                                  fullWidth
                                  to={row.path}
                                  align={"left"}
                                  onClick={() => row.onClick && row.onClick(dispatch, navigate, location)}
                                >
                                  {determineName(row, current_user)}
                                </ColumnItemButton>
                              ))}
                            </div>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
              )}
          </Box>
        </Container>
      </Toolbar>
      <Collapse in={isSearchOpen}>
        <Container maxWidth="sm" sx={{ pb: 1 }}>
          <TextField
            id="search-input"
            placeholder="Find Your Glow Here"
            variant="outlined"
            fullWidth
            size="small"
            value={localSearch}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchSubmit} edge="end">
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "white",
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                },
              },
              "& .MuiInputBase-input": {
                color: "black",
              },
              "& .MuiInputLabel-root": {
                color: "rgba(0, 0, 0, 0.6)",
              },
              "& .MuiIconButton-root": {
                color: "rgba(0, 0, 0, 0.54)",
              },
            }}
          />
        </Container>
      </Collapse>
    </AppBar>
  );
};

export default Navbar;
