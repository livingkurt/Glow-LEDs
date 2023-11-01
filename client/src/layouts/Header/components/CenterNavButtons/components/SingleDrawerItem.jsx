import { Collapse } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { GLButton } from "../../../../../shared/GlowLEDsComponents";
import DropdownButton from "./DropdownButton";

const SingleDrawerItem = ({ item, columnId, drawerColumnId, updateSubDrawerColumnId }) => {
  const shouldDisplay = drawerColumnId === columnId;

  return (
    <div style={{ height: shouldDisplay ? "auto" : "0", overflow: "hidden" }}>
      <Collapse orientation="horizontal" in={drawerColumnId === columnId}>
        <div className="" id={item.id} key={item.id} style={{ width: 233 }}>
          <Link to={item.path}>
            <GLButton variant="nav" className="ta-l">
              {item.name}
            </GLButton>
          </Link>
          <hr className="w-95per m-0px" />
          {item?.drawerItems.map((drawerItem, index) => (
            <DropdownButton
              key={`${item.id}-${index}`}
              {...drawerItem}
              updateDrawerColumnId={updateSubDrawerColumnId}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default SingleDrawerItem;
