// React
import React from "react";
import { Link } from 'react-router-dom'
// Styles
import './search.css'
// Components
import { Label } from '../../UtilityComponents/index'


function Search(props) {

  return (
    <li>
      <form onSubmit={props.submitHandler}>
        <input name="searchKeyword" onChange={(e) => props.setSearchKeyword(e.target.value)} />
        <button type="submit">Search</button>
      </form>
    </li>
  );
}

export default Search;
