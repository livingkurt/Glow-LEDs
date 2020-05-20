// React
import React from "react";
// Styles
import './sort.css'
import { Label } from "../../UtilityComponents";


function Sort(props) {

  return (
    <li className="sort_dropdown">
      <Label>Sort By</Label>
      <select name="sortOrder" className="sort_dropdown" onChange={props.sortHandler}>
        <option defaultValue="">Newest</option>
        <option defaultValue="lowest">Lowest</option>
        <option defaultValue="highest">Highest</option>
      </select>
    </li>
  );
}

export default Sort;
