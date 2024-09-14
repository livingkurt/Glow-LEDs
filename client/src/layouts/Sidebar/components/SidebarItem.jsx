import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Typography, Button, lighten } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import NestedItems from "./NestedItems";
import { setSideNavDrawer } from "../../../slices/cartSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { determineBackgroundColor, determineDropdown, determineName, hasChildren } from "../../Header/headerHelpers";
import useFeatureFlags from "../../../shared/Hooks/useFeatureFlags";

const SidebarItem = ({ item, level, handleDrawerToggle }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const current_user = useSelector(state => state.users.userPage.current_user);

  const handleClick = () => setOpen(!open);

  const activeFlags = useFeatureFlags();

  const showDropdown = determineDropdown(item, current_user);

  if (item.permissions && !item.permissions(current_user)) {
    return null;
  }

  if (item.feature && !activeFlags.includes(item.feature)) {
    return null;
  }

  return (
    <>
      <ListItem
        sx={{
          padding: 0,
          paddingLeft: `${1 + level * 2}rem`,
          color: "white",
          backgroundColor: determineBackgroundColor(level),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "48px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)", // Thin light border
        }}
      >
        <Typography
          onClick={() => {
            dispatch(setSideNavDrawer(false));
            if (item.path) {
              if (typeof item.name === "function" && item.name(current_user) === "LOGIN") {
                // Handle login action
                if (item.onClick) {
                  item.onClick(dispatch, navigate, location);
                }
              } else {
                navigate(item.path);
              }
            }
            if (item.onClick) {
              item.onClick(dispatch, navigate, location);
            }
          }}
          sx={{ my: 0, cursor: "pointer", flexGrow: 1, fontSize: "16px", fontWeight: 800 }}
        >
          {determineName(item, current_user)}
        </Typography>

        {showDropdown && hasChildren(item) && (
          <Button
            onClick={handleClick}
            variant="contained"
            sx={{
              backgroundColor: lighten(determineBackgroundColor(level), 0.25),
              borderRadius: "0px 5px 20px 0px",
              width: 34,
              height: "100%",
              fontSize: "30",
              boxShadow:
                "5px -1px 1px 0 rgba(0, 0, 0, 0.14), 4px 1px 1px -1px rgba(0, 0, 0, 0.12), 3px 0px 3px 0 rgba(0, 0, 0, 0.2)",
              color: "#333",
              "&:hover": {
                backgroundColor: lighten(determineBackgroundColor(level), 0.25),
              },
            }}
          >
            {open ? (
              <ExpandLess fontSize="large" sx={{ fontSize: 30 }} />
            ) : (
              <ExpandMore fontSize="large" sx={{ fontSize: 30 }} />
            )}
          </Button>
        )}
      </ListItem>

      {hasChildren(item) && showDropdown && (
        <NestedItems
          item={item}
          level={level}
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          parentId={item._id}
        />
      )}
    </>
  );
};

export default SidebarItem;
