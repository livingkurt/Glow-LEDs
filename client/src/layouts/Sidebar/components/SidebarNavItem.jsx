// import React from "react";
// import { GLButton } from "../../../shared/GlowLEDsComponents"; // adjust import path as needed
// import { Link } from "react-router-dom";
// import { ExpandMore } from "@mui/icons-material";
// import { determineName } from "../../Header/headerHelpers";
// import { useSelector } from "react-redux";

// const SidebarNavItem = ({ item, closeMenu }) => {
// const userPage = useSelector(state => state.users.userPage);
// const { current_user } = userPage;

// const hasLayer1Children = item.columns || item.otherColumns;

// const handleDropdown = item => () => {
//   console.log("Dropdown ID:", item); // Debug: Log the ID
//   const currentMenu = document.getElementById(item.id);

//   if (!currentMenu) {
//     console.error("Element not found:", item.id); // Debug: Log error if element not found
//     return;
//   }

//   currentMenu.classList.toggle("hide-menu");
// };

//   return (
//     <div>
//       <div className="sidebar-btn-container">
//         {item.path ? (
//           <GLButton className="sidebar-btn primary" onClick={closeMenu}>
//             <Link to={item.path}>{determineName(item, current_user)}</Link>
//           </GLButton>
//         ) : (
//           <GLButton className="sidebar-btn primary">{determineName(item, current_user)}</GLButton>
//         )}

//         {hasLayer1Children && (
//           <GLButton className="sidebar-btn-dropdown" onClick={handleDropdown(item)} aria-label="Show">
//             <ExpandMore className="fs-25px" />
//           </GLButton>
//         )}
//       </div>

//       {hasLayer1Children && (
//         <ul id={item.id} className="sidebar_dropdown_container">
//           {item.columns?.map(child => (
//             <SidebarNavItem key={child._id} item={child} closeMenu={closeMenu} />
//           ))}
//           {item.otherColumns?.map(child => (
//             <SidebarNavItem key={child._id} item={child} closeMenu={closeMenu} />
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SidebarNavItem;

import React from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents"; // Adjust import path as needed
import { Link } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";
import { determineName } from "../../Header/headerHelpers";
import { useSelector } from "react-redux";

const NavItem = ({ item, closeMenu }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const hasChildren = item.columns || item.otherColumns;

  const handleDropdown = id => () => {
    const currentMenu = document.getElementById(id);
    if (currentMenu) {
      currentMenu.classList.toggle("hide-menu");
    }
  };

  const renderSubItems = (subItems, level) => {
    return subItems.map(subItem => {
      const subMenuId = `sub-menu-${level}-${subItem._id}`;
      return (
        <li key={subItem._id}>
          <div className="sidebar-btn-container">
            {subItem.path ? (
              <Link to={subItem.path} onClick={closeMenu}>
                <GLButton className={`sidebar-btn nested-${level}`}>{determineName(subItem, current_user)}</GLButton>
              </Link>
            ) : (
              <GLButton className={`sidebar-btn nested-${level}`}>{determineName(subItem, current_user)}</GLButton>
            )}
            {(subItem.columns || subItem.otherColumns) && (
              <GLButton className="sidebar-btn-dropdown" onClick={handleDropdown(subMenuId)} aria-label="Show">
                <ExpandMore className="fs-25px" />
              </GLButton>
            )}
          </div>
          {(subItem.columns || subItem.otherColumns) && (
            <ul id={subMenuId} className="sidebar_dropdown_nested_container">
              {renderSubItems(subItem.columns || [], level + 1)}
              {renderSubItems(subItem.otherColumns || [], level + 1)}
            </ul>
          )}
        </li>
      );
    });
  };

  return (
    <div>
      <div className="sidebar-btn-container">
        {item.path ? (
          <GLButton className="sidebar-btn primary" onClick={closeMenu}>
            <Link to={item.path}>{determineName(item, current_user)}</Link>
          </GLButton>
        ) : (
          <GLButton className="sidebar-btn primary">{determineName(item, current_user)}</GLButton>
        )}

        {hasChildren && (
          <GLButton className="sidebar-btn-dropdown" onClick={handleDropdown(item.id)} aria-label="Show">
            <ExpandMore className="fs-25px" />
          </GLButton>
        )}
      </div>

      {hasChildren && (
        <ul id={item.id} className="sidebar_dropdown_container">
          {renderSubItems(item.columns || [], 1)}
          {renderSubItems(item.otherColumns || [], 1)}
        </ul>
      )}
    </div>
  );
};

export default NavItem;

// // import React from "react";
// // import { GLButton } from "../../../shared/GlowLEDsComponents"; // adjust import path as needed
// // import { Link } from "react-router-dom";
// // import { ExpandMore } from "@mui/icons-material";
// // import { determineName } from "../../Header/headerHelpers";
// // import { useSelector } from "react-redux";

// // const SidebarNavItem = ({ item, closeMenu }) => {
// // const userPage = useSelector(state => state.users.userPage);
// // const { current_user } = userPage;

// // const hasLayer1Children = item.columns || item.otherColumns;

// // const handleDropdown = item => () => {
// //   console.log("Dropdown ID:", item); // Debug: Log the ID
// //   const currentMenu = document.getElementById(item.id);

// //   if (!currentMenu) {
// //     console.error("Element not found:", item.id); // Debug: Log error if element not found
// //     return;
// //   }

// //   currentMenu.classList.toggle("hide-menu");
// // };

// //   return (
// //     <div>
// //       <div className="sidebar-btn-container">
// //         {item.path ? (
// //           <GLButton className="sidebar-btn primary" onClick={closeMenu}>
// //             <Link to={item.path}>{determineName(item, current_user)}</Link>
// //           </GLButton>
// //         ) : (
// //           <GLButton className="sidebar-btn primary">{determineName(item, current_user)}</GLButton>
// //         )}

// //         {hasLayer1Children && (
// //           <GLButton className="sidebar-btn-dropdown" onClick={handleDropdown(item)} aria-label="Show">
// //             <ExpandMore className="fs-25px" />
// //           </GLButton>
// //         )}
// //       </div>

// //       {hasLayer1Children && (
// //         <ul id={item.id} className="sidebar_dropdown_container">
// //           {item.columns?.map(child => (
// //             <SidebarNavItem key={child._id} item={child} closeMenu={closeMenu} />
// //           ))}
// //           {item.otherColumns?.map(child => (
// //             <SidebarNavItem key={child._id} item={child} closeMenu={closeMenu} />
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default SidebarNavItem;

// import React from "react";
// import { GLButton } from "../../../shared/GlowLEDsComponents"; // Adjust import path as needed
// import { Link } from "react-router-dom";
// import { ExpandMore } from "@mui/icons-material";
// import { determineName } from "../../Header/headerHelpers";
// import { useSelector } from "react-redux";

// const NavItem = ({ item, closeMenu }) => {
//   const userPage = useSelector((state) => state.users.userPage);
//   const { current_user } = userPage;

//   const hasChildren = item.columns || item.otherColumns;

//   const handleDropdown = (id) => () => {
//     const currentMenu = document.getElementById(id);
//     if (currentMenu) {
//       currentMenu.classList.toggle("hide-menu");
//     }
//   };

//   const renderSubItems = (subItems, level) => {
//     return subItems.map((subItem) => {
//       const subMenuId = `sub-menu-${level}-${subItem._id}`;
//       return (
//         <li key={subItem._id}>
//           <div className="sidebar-btn-container">
//             {subItem.path ? (
//               <Link to={subItem.path} onClick={closeMenu}>
//                 <GLButton className={`sidebar-btn nested-${level}`}>
//                   {determineName(subItem, current_user)}
//                 </GLButton>
//               </Link>
//             ) : (
//               <GLButton className={`sidebar-btn nested-${level}`}>
//                 {determineName(subItem, current_user)}
//               </GLButton>
//             )}
//             {(subItem.columns || subItem.otherColumns) && (
//               <GLButton
//                 className="sidebar-btn-dropdown"
//                 onClick={handleDropdown(subMenuId)}
//                 aria-label="Show"
//               >
//                 <ExpandMore className="fs-25px" />
//               </GLButton>
//             )}
//           </div>
//           {(subItem.columns || subItem.otherColumns) && (
//             <ul id={subMenuId} className="sidebar_dropdown_nested_container">
//               {renderSubItems(subItem.columns || [], level + 1)}
//               {renderSubItems(subItem.otherColumns || [], level + 1)}
//             </ul>
//           )}
//         </li>
//       );
//     });
//   };

//   return (
//     <div>
//       <div className="sidebar-btn-container">
//         {item.path ? (
//           <GLButton className="sidebar-btn primary" onClick={closeMenu}>
//             <Link to={item.path}>{determineName(item, current_user)}</Link>
//           </GLButton>
//         ) : (
//           <GLButton className="sidebar-btn primary">{determineName(item, current_user)}</GLButton>
//         )}

//         {hasChildren && (
//           <GLButton
//             className="sidebar-btn-dropdown"
//             onClick={handleDropdown(item.id)}
//             aria-label="Show"
//           >
//             <ExpandMore className="fs-25px" />
//           </GLButton>
//         )}
//       </div>

//       {hasChildren && (
//         <ul id={item.id} className="sidebar_dropdown_container">
//           {renderSubItems(item.columns || [], 1)}
//           {renderSubItems(item.otherColumns || [], 1)}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NavItem;

// import React from "react";
// import { GLButton } from "../../../shared/GlowLEDsComponents"; // Adjust import path as needed
// import { Link } from "react-router-dom";
// import { ExpandMore } from "@mui/icons-material";
// import { determineName } from "../../Header/headerHelpers";
// import { useSelector } from "react-redux";

// const NavItem = ({ item, closeMenu, level = 0 }) => {
//   const userPage = useSelector(state => state.users.userPage);
//   const { current_user } = userPage;

//   const handleDropdown = (subMenuId) => () => {
//     const currentMenu = document.getElementById(subMenuId);
//     if (currentMenu) {
//       currentMenu.classList.toggle("hide-menu");
//     }
//   };

//   const renderNestedItems = (nestedItems, currentLevel) => {
//     return nestedItems.map((nestedItem) => {
//       const subMenuId = `sub-menu-${currentLevel}-${nestedItem._id}`;
//       const hasNestedChildren = nestedItem.rows || (nestedItem.sideDrawer && nestedItem.sideDrawer.drawerItems);

//       return (
//         <li key={nestedItem._id}>
//           <div className="sidebar-btn-container">
//             <GLButton className={`sidebar-btn nested-${currentLevel}`} onClick={hasNestedChildren ? handleDropdown(subMenuId) : closeMenu}>
//               {nestedItem.path ? <Link to={nestedItem.path}>{determineName(nestedItem, current_user)}</Link> : determineName(nestedItem, current_user)}
//               {hasNestedChildren && <ExpandMore className="fs-25px" />}
//             </GLButton>
//           </div>
//           {hasNestedChildren && (
//             <ul id={subMenuId} className="sidebar_dropdown_nested_container">
//               {nestedItem.rows && renderNestedItems(nestedItem.rows, currentLevel + 1)}
//               {nestedItem.sideDrawer && nestedItem.sideDrawer.drawerItems && renderNestedItems(nestedItem.sideDrawer.drawerItems, currentLevel + 1)}
//             </ul>
//           )}
//         </li>
//       );
//     });
//   };

//   const topLevelId = `top-level-menu-${item._id}`;
//   const hasTopLevelChildren = item.rows || (item.sideDrawer && item.sideDrawer.drawerItems);

//   return (
//     <div>
//       <div className="sidebar-btn-container">
//         <GLButton className={`sidebar-btn ${level === 0 ? 'primary' : `nested-${level}`}`} onClick={hasTopLevelChildren ? handleDropdown(topLevelId) : closeMenu}>
//           {item.path ? <Link to={item.path}>{determineName(item, current_user)}</Link> : determineName(item, current_user)}
//           {hasTopLevelChildren && <ExpandMore className="fs-25px" />}
//         </GLButton>
//       </div>
//       {hasTopLevelChildren && (
//         <ul id={topLevelId} className="sidebar_dropdown_container">
//           {item.rows && renderNestedItems(item.rows, level + 1)}
//           {item.sideDrawer && item.sideDrawer.drawerItems && renderNestedItems(item.sideDrawer.drawerItems, level + 1)}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NavItem;

// import React from "react";
// import { GLButton } from "../../../shared/GlowLEDsComponents"; // Adjust import path as needed
// import { Link } from "react-router-dom";
// import { ExpandMore } from "@mui/icons-material";
// import { determineName } from "../../Header/headerHelpers";
// import { useSelector, useDispatch } from "react-redux";

// // A recursive component to render nav items and any number of nested sub-items
// const NavItem = ({ item, closeMenu, level = 0 }) => {
//   const dispatch = useDispatch();
//   const userPage = useSelector(state => state.users.userPage);
//   const { current_user } = userPage;

//   const handleDropdown = subMenuId => () => {
//     const currentMenu = document.getElementById(subMenuId);
//     if (currentMenu) {
//       currentMenu.classList.toggle("hide-menu");
//     }
//   };

//   const renderSubItems = (subItems, currentLevel) => {
//     if (!subItems) return null;

//     return subItems.map(subItem => {
//       // Include the logic for permissions here if needed, using subItem.permissions
//       const subMenuId = `sub-menu-${currentLevel}-${subItem._id}`;
//       return (
//         <li key={subItem._id}>
//           <div className="sidebar-btn-container">
//             {subItem.path ? (
//               <Link to={subItem.path} onClick={closeMenu}>
//                 <GLButton className={`sidebar-btn nested-${currentLevel}`}>{subItem.name}</GLButton>
//               </Link>
//             ) : (
//               <GLButton
//                 className={`sidebar-btn nested-${currentLevel}`}
//                 onClick={subItem.onClick ? () => subItem.onClick(dispatch, closeMenu) : undefined}
//               >
//                 {subItem.name}
//               </GLButton>
//             )}
//             {(subItem.rows || subItem.drawerItems || subItem.subHeaderDrawers) && (
//               <GLButton className="sidebar-btn-dropdown" onClick={handleDropdown(subMenuId)} aria-label="Show">
//                 <ExpandMore className="fs-25px" />
//               </GLButton>
//             )}
//           </div>
//           {(subItem.rows || subItem.drawerItems || subItem.subHeaderDrawers) && (
//             <ul id={subMenuId} className={`sidebar_dropdown_nested_container nested-${currentLevel}`}>
//               {renderSubItems(subItem.rows, currentLevel + 1)}
//               {renderSubItems(subItem.drawerItems, currentLevel + 1)}
//               {renderSubItems(subItem.subHeaderDrawers, currentLevel + 1)}
//             </ul>
//           )}
//         </li>
//       );
//     });
//   };

//   // Determine if the current item has any type of children
//   const hasChildren = item.rows || item.drawerItems || item.subHeaderDrawers;
//   const topLevelId = `top-level-menu-${item._id}`;

//   return (
//     <div>
//       <div className="sidebar-btn-container">
//         {item.path ? (
//           <GLButton className={`sidebar-btn ${level === 0 ? "primary" : `nested-${level}`}`} onClick={closeMenu}>
//             <Link to={item.path}>{determineName(item, current_user)}</Link>
//           </GLButton>
//         ) : (
//           <GLButton
//             className={`sidebar-btn ${level === 0 ? "primary" : `nested-${level}`}`}
//             onClick={item.onClick ? () => item.onClick(dispatch, closeMenu) : undefined}
//           >
//             {determineName(item, current_user)}
//           </GLButton>
//         )}

//         {hasChildren && (
//           <GLButton className="sidebar-btn-dropdown" onClick={handleDropdown(topLevelId)} aria-label="Show">
//             <ExpandMore className="fs-25px" />
//           </GLButton>
//         )}
//       </div>

//       {hasChildren && (
//         <ul id={topLevelId} className={`sidebar_dropdown_container ${level === 0 ? "" : `nested-${level}`}`}>
//           {renderSubItems(item.rows, level + 1)}
//           {renderSubItems(item.drawerItems, level + 1)}
//           {renderSubItems(item.subHeaderDrawers, level + 1)}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NavItem;

// import React from "react";
// import { GLButton } from "../../../shared/GlowLEDsComponents"; // Adjust import path as needed
// import { Link } from "react-router-dom";
// import { ExpandMore } from "@mui/icons-material";
// import { useSelector, useDispatch } from "react-redux";

// // A recursive component to render nav items and any number of nested sub-items
// const NavItem = ({ item, closeMenu }) => {
//   const dispatch = useDispatch();
//   const userPage = useSelector(state => state.users.userPage);
//   const { current_user } = userPage;

//   const renderSubItems = (subItems, level) => {
//     return subItems.map(subItem => {
//       // Handle permissions if necessary, using subItem.permissions
//       const subMenuId = `sub-menu-${level}-${subItem._id}`;
//       return (
//         <li key={subItem._id}>
//           <div className="sidebar-btn-container">
//             {subItem.path ? (
//               <Link to={subItem.path} onClick={closeMenu}>
//                 <GLButton className={`sidebar-btn nested-${level}`}>{subItem.name}</GLButton>
//               </Link>
//             ) : (
//               <GLButton
//                 className={`sidebar-btn nested-${level}`}
//                 onClick={subItem.onClick ? () => subItem.onClick(dispatch, closeMenu) : undefined}
//               >
//                 {subItem.name}
//               </GLButton>
//             )}
//             {(subItem.rows || subItem.drawerItems || subItem.subHeaderDrawers) && (
//               <GLButton className="sidebar-btn-dropdown" onClick={() => toggleDropdown(subMenuId)} aria-label="Show">
//                 <ExpandMore className="fs-25px" />
//               </GLButton>
//             )}
//           </div>
//           {(subItem.rows || subItem.drawerItems || subItem.subHeaderDrawers) && (
//             <ul id={subMenuId} className={`sidebar_dropdown_nested_container nested-${level}`}>
//               {renderSubItems(subItem.rows || [], level + 1)}
//               {renderSubItems(subItem.drawerItems || [], level + 1)}
//               {renderSubItems(subItem.subHeaderDrawers || [], level + 1)}
//             </ul>
//           )}
//         </li>
//       );
//     });
//   };

//   const toggleDropdown = id => {
//     const currentMenu = document.getElementById(id);
//     if (currentMenu) {
//       currentMenu.classList.toggle("hide-menu");
//     }
//   };

//   const hasChildren = item.columns || item.otherColumns || item.rows || item.drawerItems || item.subHeaderDrawers;
//   const topLevelId = `top-level-menu-${item._id}`;

//   return (
//     <div>
//       <div className="sidebar-btn-container">
//         {item.path ? (
//           <GLButton className="sidebar-btn primary" onClick={closeMenu}>
//             <Link to={item.path}>{item.name}</Link>
//           </GLButton>
//         ) : (
//           <GLButton
//             className="sidebar-btn primary"
//             onClick={item.onClick ? () => item.onClick(dispatch, closeMenu) : undefined}
//           >
//             {item.name}
//           </GLButton>
//         )}

//         {hasChildren && (
//           <GLButton className="sidebar-btn-dropdown" onClick={() => toggleDropdown(topLevelId)} aria-label="Show">
//             <ExpandMore className="fs-25px" />
//           </GLButton>
//         )}
//       </div>

//       {hasChildren && (
//         <ul id={topLevelId} className="sidebar_dropdown_container">
//           {item.columns?.map(column => renderSubItems(column.rows || [], 1))}
//           {item.otherColumns?.map(column => renderSubItems(column.rows || [], 1))}
//           {renderSubItems(item.rows || [], 1)}
//           {renderSubItems(item.drawerItems || [], 1)}
//           {renderSubItems(item.subHeaderDrawers || [], 1)}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NavItem;

// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { ExpandMore } from '@mui/icons-material';
// import { GLButton } from '../../../shared/GlowLEDsComponents';

// const NavItem = ({ item, closeMenu, level = 0 }) => {
//   const userPage = useSelector((state) => state.users.userPage);
//   const { current_user } = userPage;

//   const handleDropdown = (subMenuId) => {
//     const currentMenu = document.getElementById(subMenuId);
//     if (currentMenu) {
//       currentMenu.classList.toggle('hide-menu');
//     }
//   };

//   const renderSubItems = (subItems, currentLevel) => {
//     return subItems.map((subItem) => {
//       const subMenuId = `sub-menu-level-${currentLevel}-${subItem._id}`;
//       return (
//         <li key={subItem._id}>
//           <div className={`sidebar-btn-container ${'nested-' + currentLevel}`}>
//             {subItem.path ? (
//               <Link to={subItem.path} onClick={closeMenu}>
//                 <GLButton className={`sidebar-btn ${'nested-' + currentLevel}`}>{subItem.name}</GLButton>
//               </Link>
//             ) : (
//               <GLButton className={`sidebar-btn ${'nested-' + currentLevel}`} onClick={subItem.onClick ? () => subItem.onClick() : undefined}>
//                 {subItem.name}
//               </GLButton>
//             )}

//             {hasChildren(subItem) && (
//               <GLButton className={`sidebar-btn-dropdown ${'nested-' + currentLevel}`} onClick={() => handleDropdown(subMenuId)}>
//                 <ExpandMore />
//               </GLButton>
//             )}
//           </div>

//           {hasChildren(subItem) && (
//             <ul id={subMenuId} className={`sidebar_dropdown_${'nested-' + currentLevel}_container`}>
//               {renderSubItems(subItem.columns || subItem.rows || subItem.drawerItems || subItem.subHeaderDrawers || [], currentLevel + 1)}
//             </ul>
//           )}
//         </li>
//       );
//     });
//   };

//   const hasChildren = (item) => {
//     return item.columns || item.rows || item.drawerItems || item.subHeaderDrawers || item.otherColumns;
//   };

//   return (
//     <div className={`sidebar-item ${'nested-' + level}`}>
//       <div className="sidebar-btn-container">
//         {item.path ? (
//           <Link to={item.path} onClick={closeMenu}>
//             <GLButton className={`sidebar-btn ${level === 0 ? 'primary' : 'secondary'}`}>{item.name}</GLButton>
//           </Link>
//         ) : (
//           <GLButton className={`sidebar-btn ${level === 0 ? 'primary' : 'secondary'}`} onClick={item.onClick ? () => item.onClick() : undefined}>
//             {item.name}
//           </GLButton>
//         )}

//         {hasChildren(item) && (
//           <GLButton className={`sidebar-btn-dropdown ${level === 0 ? 'primary' : 'secondary'}`} onClick={() => handleDropdown(`top-level-menu-${item._id}`)}>
//             <ExpandMore />
//           </GLButton>
//         )}
//       </div>

//       {hasChildren(item) && (
//         <ul id={`top-level-menu-${item._id}`} className={`sidebar_dropdown_${level === 0 ? 'primary' : 'secondary'}_container`}>
//           {renderSubItems(item.columns || item.rows || item.drawerItems || item.subHeaderDrawers || item.otherColumns || [], level + 1)}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NavItem;

// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { ExpandMore } from "@mui/icons-material";
// import { GLButton } from "../../../shared/GlowLEDsComponents";

// const NavItem = ({ item, closeMenu, level = 0 }) => {
//   const userPage = useSelector(state => state.users.userPage);
//   const { current_user } = userPage;

//   const handleDropdown = subMenuId => {
//     const currentMenu = document.getElementById(subMenuId);
//     if (currentMenu) {
//       currentMenu.classList.toggle("hide-menu");
//     }
//   };

//   const renderSubItems = (subItems, currentLevel) => {
//     return subItems.map(subItem => {
//       const subMenuId = `sub-menu-level-${currentLevel}-${subItem._id}`;
//       return (
//         <li key={subItem._id}>
//           <div className={`sidebar-btn-container ${"nested-" + currentLevel}`}>
//             {subItem.path ? (
//               <Link to={subItem.path} onClick={closeMenu}>
//                 <GLButton className={`sidebar-btn ${"nested-" + currentLevel}`}>{subItem.name}</GLButton>
//               </Link>
//             ) : (
//               <GLButton
//                 className={`sidebar-btn ${"nested-" + currentLevel}`}
//                 onClick={subItem.onClick ? () => subItem.onClick() : undefined}
//               >
//                 {subItem.name}
//               </GLButton>
//             )}

//             {hasChildren(subItem) && (
//               <GLButton
//                 className={`sidebar-btn-dropdown ${"nested-" + currentLevel}`}
//                 onClick={() => handleDropdown(subMenuId)}
//               >
//                 <ExpandMore />
//               </GLButton>
//             )}
//           </div>

//           {hasChildren(subItem) && (
//             <ul id={subMenuId} className={`sidebar_dropdown_${"nested-" + currentLevel}_container`}>
//               {renderSubItems(
//                 subItem.columns || subItem.rows || subItem.drawerItems || subItem.subHeaderDrawers || [],
//                 currentLevel + 1
//               )}
//             </ul>
//           )}
//         </li>
//       );
//     });
//   };

//   const hasChildren = item => {
//     return item.columns || item.rows || item.drawerItems || item.subHeaderDrawers || item.otherColumns;
//   };

//   return (
//     <div className={`sidebar-item ${"nested-" + level}`}>
//       <div className="sidebar-btn-container">
//         {item.path ? (
//           <Link to={item.path} onClick={closeMenu}>
//             <GLButton className={`sidebar-btn ${level === 0 ? "primary" : "secondary"}`}>{item.name}</GLButton>
//           </Link>
//         ) : (
//           <GLButton
//             className={`sidebar-btn ${level === 0 ? "primary" : "secondary"}`}
//             onClick={item.onClick ? () => item.onClick() : undefined}
//           >
//             {item.name}
//           </GLButton>
//         )}

//         {hasChildren(item) && (
//           <GLButton
//             className={`sidebar-btn-dropdown ${level === 0 ? "primary" : "secondary"}`}
//             onClick={() => handleDropdown(`top-level-menu-${item._id}`)}
//           >
//             <ExpandMore />
//           </GLButton>
//         )}
//       </div>

//       {hasChildren(item) && (
//         <ul
//           id={`top-level-menu-${item._id}`}
//           className={`sidebar_dropdown_${level === 0 ? "primary" : "secondary"}_container`}
//         >
//           {renderSubItems(
//             item.columns || item.rows || item.drawerItems || item.subHeaderDrawers || item.otherColumns || [],
//             level + 1
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NavItem;
