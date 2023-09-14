import React from "react";
import { Routes, Route } from "react-router";
import { navItems } from "../layouts/Header/headerHelpers";
import { routes } from "../utils/helpers/routes";

const extractPaths = obj => {
  let paths = [];
  if (Array.isArray(obj)) {
    obj.forEach(item => {
      paths = paths.concat(extractPaths(item));
    });
  } else if (typeof obj === "object" && obj !== null) {
    if (obj.path) {
      paths.push({ path: obj.path });
    }
    for (let key in obj) {
      paths = paths.concat(extractPaths(obj[key]));
    }
  }
  return paths;
};

const allRoutes = extractPaths(navItems);

const uniqueRoutes = [...allRoutes, ...routes];

export default (
  <Routes>
    {uniqueRoutes.map((route, index) => (
      <Route key={index} path={route.path} />
    ))}
  </Routes>
);
