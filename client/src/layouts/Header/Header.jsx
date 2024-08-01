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
import { navItems, determineDropdown, determineName, rightNav } from "./headerHelpers";
import Banner from "./components/Banner";
import Environment from "./components/Environment";
import HeaderButton from "./components/CenterNavButtons/components/HeaderButton";
import HeaderColumn from "./components/CenterNavButtons/components/HeaderColumn";
import HeaderDrawer from "./components/CenterNavButtons/components/HeaderDrawer";
import HeaderSubDrawer from "./components/CenterNavButtons/components/HeaderSubDrawer";
import ColumnItemButton from "./components/CenterNavButtons/components/ColumnItemButton";
import { debounce } from "lodash";
import { setSearch } from "../../pages/ProductsGridPage/productsGridPageSlice";
import { set_first_name } from "../../slices/userSlice";
import { getCartQuantity } from "../../helpers/sharedHelpers";

const Header = () => {
  // ... (keep all the existing state and hooks)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isTabletDown = useMediaQuery(theme.breakpoints.down("md"));
  const isTabletUp = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { search } = useSelector(state => state.products.productsGridPage);
  const [localSearch, setLocalSearch] = useState(search);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const debouncedSearch = useCallback(
    debounce(searchTerm => {
      dispatch(setSearch(searchTerm));
      navigate(`/collections/all/products?search=${searchTerm}`);
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
    navigate(`/collections/all/products?search=${localSearch}`);
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
    <AppBar position="static" color="transparent" elevation={5}>
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
          <Box display="flex" alignItems="center">
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
                sx={{ width: 50, marginRight: 1 }}
                src="/images/optimized_images/logo_images/glow_leds_text_logo.png"
                alt="Glow LEDs Logo"
                title="Big Logo"
              />
              <Typography variant="glow_leds" sx={{ fontSize: isMobile ? "20px" : "24px", color: "white" }}>
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
              }}
            >
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

          <Box display="flex" alignItems="center">
            <HeaderButton onClick={toggleSearch}>
              <Search sx={{ marginTop: "-4px", fontSize: "20px" }} />
            </HeaderButton>
            <HeaderButton
              onClick={() => dispatch(setCartDrawer(true))}
              sx={{
                display: "flex",
                alignItems: "center",
                ...(cartItems.length > 0 && isTabletUp
                  ? {
                      animation: "bob 2s infinite",
                      boxShadow: theme.shadows[4],
                      backgroundColor: theme.palette.primary.main,
                    }
                  : {}),
              }}
            >
              <ShoppingCart sx={{ marginTop: "-4px" }} />
              <Box component="span" sx={{ marginLeft: "1px" }}>
                {getCartQuantity(cartItems)}
              </Box>
            </HeaderButton>
            {isTabletUp &&
              rightNav(dispatch).map(
                (item, index) =>
                  item.permissions(current_user) && (
                    <div key={index} className="dropdown">
                      <HeaderButton
                        ariaLabel={item.ariaLabel}
                        onClick={() => item.onClick && item.onClick(current_user)}
                      >
                        {determineName(item, current_user)}
                      </HeaderButton>
                      {determineDropdown(item, current_user) && (
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

export default Header;
