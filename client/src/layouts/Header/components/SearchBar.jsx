import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, InputAdornment, IconButton, Box, Container } from "@mui/material";
import { Search } from "@mui/icons-material";
import { debounce } from "lodash";
import useWindowDimensions from "../../../shared/Hooks/useWindowDimensions";
import { setSearch } from "../../../pages/ProductsGridPage/productsGridPageSlice";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useSelector(state => state.products.productsGridPage);
  const { width } = useWindowDimensions();
  const [localSearch, setLocalSearch] = useState(search);

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
