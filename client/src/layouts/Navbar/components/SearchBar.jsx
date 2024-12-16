import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import debounce from "lodash/debounce";
import useWindowDimensions from "../../../shared/Hooks/useWindowDimensions";
import { setSearch } from "../../../pages/ProductsGridPage/productsGridPageSlice";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useSelector(state => state.products.productsGridPage);
  const { width } = useWindowDimensions();
  const [localSearch, setLocalSearch] = useState(search);

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
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        margin: "auto",
        borderRadius: "10px",
        width: "100%",
        marginTop: width < 1107 ? "15px" : "5px",
        display: "flex",
        justifyContent: "center",
        mr: 2,
      }}
    >
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
  );
};

export default SearchBar;
