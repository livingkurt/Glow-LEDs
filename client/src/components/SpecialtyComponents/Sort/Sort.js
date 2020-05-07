// React
import React from "react";
// Styles
import './sort.css'


function Sort(props) {

  return (
    <li className="sort_dropdown">
      Sort By {' '}
      <select name="sortOrder" className="sort_dropdow" onChange={props.sortHandler}>
        <option defaultValue="">Newest</option>
        <option defaultValue="lowest">Lowest</option>
        <option defaultValue="highest">Highest</option>
      </select>
    </li>
  );
}

export default Sort;
