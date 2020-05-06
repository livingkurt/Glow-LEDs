// React
import React from "react";
import { Link } from 'react-router-dom'
// Styles
import './sort.css'
// Components
import { Label } from '../../UtilityComponents/index'


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
