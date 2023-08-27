import * as React from "react";
import { Switch, Route } from "react-router";
import routes from "./routes";
import { navItems } from "../shared/ContainerComponents/Header/headerHelpers";

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
  <Switch>
    {uniqueRoutes.map((route, index) => (
      <Route key={index} path={route.path} />
    ))}
  </Switch>
);
