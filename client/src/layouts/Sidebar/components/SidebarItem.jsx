import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Typography, Button, lighten } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import NestedItems from "./NestedItems";
import { setSideNavDrawer } from "../../../slices/cartSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { determineBackgroundColor, determineDropdown, determineName, hasChildren } from "../../Header/headerHelpers";

const SidebarItem = ({ item, level, handleDrawerToggle }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const current_user = useSelector(state => state.users.userPage.current_user);

  const handleClick = () => setOpen(!open);

  return (
    <>
      {(!item?.permissions || item.permissions(current_user)) && (
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
              if (item.path) {
                if (typeof item.name === "function" && item.name(current_user) === "Login") {
                } else {
                  navigate(item.path);
                }
              }
              if (item.onClick) {
                item.onClick(dispatch, navigate, location);
              }
              dispatch(setSideNavDrawer(false));
            }}
            sx={{ my: 0, cursor: "pointer", flexGrow: 1 }}
          >
            {determineName(item, current_user)}
          </Typography>

          {(!item?.permissions || item.permissions(current_user)) &&
            determineDropdown(item, current_user) &&
            hasChildren(item) && (
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
      )}

      {hasChildren(item) && (
        <NestedItems item={item} level={level} open={open} handleDrawerToggle={handleDrawerToggle} />
      )}
    </>
  );
};

export default SidebarItem;

// import React, { useState } from "react";
// import { List, ListItem, Collapse, Button, Typography, lighten } from "@mui/material";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import { determineDropdown, determineName } from "../../Header/headerHelpers";
// import { useDispatch, useSelector } from "react-redux";
// import { setSideNavDrawer } from "../../../slices/cartSlice";
// import { useLocation, useNavigate } from "react-router-dom";

// const SidebarItem = ({ item, level, handleDrawerToggle }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [open, setOpen] = useState(false);

//   const users = useSelector(state => state.users.userPage);
//   const { current_user } = users;

// const hasChildren =
//   item.rows?.length > 0 ||
//   item.columns?.length > 0 ||
//   item.column?.length > 0 ||
//   item.otherColumns?.length > 0 ||
//   item.sideDrawer?.drawerItems?.length > 0 ||
//   item.subSideDrawer?.subHeaderDrawers?.length > 0;

//   const handleClick = e => {
//     e.stopPropagation();
//     setOpen(!open);
//   };

//   // Recursively render the nested items and increment the level
//   const renderNestedItems = (nestedItems, level) => {
//     return nestedItems.map(child => (
//       <SidebarItem key={child._id} item={child} level={level + 1} handleDrawerToggle={handleDrawerToggle} />
//     ));
//   };

// const determineBackgroundColor = level => {
//   switch (level) {
//     case 0:
//       return "#333333";
//     case 1:
//       return "#4c526d";
//     case 2:
//       return "#343a52";
//     case 3:
//       return "#282c3b";
//     case 4:
//       return "#1d202b";
//     default:
//       return "#999999";
//   }
// };

//   return (
//     <>
// {(!item?.permissions || item.permissions(current_user)) && (
//   <ListItem
//     sx={{
//       padding: 0,
//       paddingLeft: `${1 + level * 2}rem`,
//       color: "white",
//       backgroundColor: determineBackgroundColor(level),
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       height: "48px",
//       borderBottom: "1px solid rgba(255, 255, 255, 0.12)", // Thin light border
//     }}
//   >
//     <Typography
//       onClick={() => {
//         if (item.path) {
//           if (typeof item.name === "function" && item.name(current_user) === "Login") {
//           } else {
//             navigate(item.path);
//           }
//         }
//         if (item.onClick) {
//           item.onClick(dispatch, navigate, location);
//         }
//         dispatch(setSideNavDrawer(false));
//       }}
//       sx={{ my: 0, cursor: "pointer", flexGrow: 1 }}
//     >
//       {determineName(item, current_user)}
//     </Typography>

//     {(!item?.permissions || item.permissions(current_user)) &&
//       determineDropdown(item, current_user) &&
//       hasChildren && (
//         <Button
//           onClick={handleClick}
//           variant="contained"
//           sx={{
//             backgroundColor: lighten(determineBackgroundColor(level), 0.25),
//             borderRadius: "0px 5px 20px 0px",
//             width: 34,
//             height: "100%",
//             fontSize: "30",
//             boxShadow:
//               "5px -1px 1px 0 rgba(0, 0, 0, 0.14), 4px 1px 1px -1px rgba(0, 0, 0, 0.12), 3px 0px 3px 0 rgba(0, 0, 0, 0.2)",
//             color: "#333",
//             "&:hover": {
//               backgroundColor: lighten(determineBackgroundColor(level), 0.25),
//             },
//           }}
//         >
//           {open ? (
//             <ExpandLess fontSize="large" sx={{ fontSize: 30 }} />
//           ) : (
//             <ExpandMore fontSize="large" sx={{ fontSize: 30 }} />
//           )}
//         </Button>
//       )}
//   </ListItem>
// )}

//       {determineDropdown(item, current_user) && hasChildren && (
//         <Collapse in={open} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
// {!item.column && item.columns && renderNestedItems(item.columns, level)}
// {item.column && renderNestedItems(item.column, level)}
// {item.otherColumns && renderNestedItems(item.otherColumns, level)}
// {item.rows && renderNestedItems(item.rows, level)}
// {item.sideDrawer?.drawerItems && renderNestedItems(item.sideDrawer.drawerItems, level)}
// {item.subSideDrawer?.subHeaderDrawers && renderNestedItems(item.subSideDrawer?.subHeaderDrawers, level)}
//           </List>
//         </Collapse>
//       )}
//     </>
//   );
// };

// export default SidebarItem;
