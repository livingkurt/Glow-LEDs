// React
import React from "react";
// Styles
import './search.css'
// Components
import { ButtonWord, EditorInput } from '../../UtilityComponents/index'


function Search(props) {

  return (
    <form onSubmit={props.submitHandler} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginRight: "20px" }}>
      <EditorInput styles={{ marginTop: "6px" }} name="searchKeyword" on_change_function={props.setSearchKeyword} />
      <ButtonWord type="submit">Search</ButtonWord>
    </form>
  );
}

export default Search;
