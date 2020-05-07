// React
import React from "react";
import { Link } from 'react-router-dom'
// Styles
import './search.css'
// Components
import { Label, ButtonWord, EditorInput } from '../../UtilityComponents/index'


function Search(props) {

  return (
    <form onSubmit={props.submitHandler} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginRight: "20px" }}>
      <EditorInput name="searchKeyword" on_change_function={props.setSearchKeyword} />
      <ButtonWord type="submit">Search</ButtonWord>
    </form>
  );
}

export default Search;
