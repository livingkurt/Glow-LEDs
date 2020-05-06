// React
import React from "react";
// Styles
import './sort.css'


function Sort(props) {

  return (
    <li>
      Sort By {' '}
      <select name="sortOrder" onChange={props.sortHandler}>
        <option defaultValue="">Newest</option>
        <option defaultValue="lowest">Lowest</option>
        <option defaultValue="highest">Highest</option>
      </select>
    </li>
  );
}

export default Sort;
