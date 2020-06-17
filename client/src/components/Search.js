import React from "react";
import './css/Search.css'

const Search = props => {
  return (
    <div id="search">
      <form onSubmit={props.searchSubmitListener}>
        <input
          className="input"
          type="text"
          value={props.searchTerm}
          placeholder="Search by skill"
          onChange={props.searchListener}
        />
        <br />
      </form>
    </div>
  );
};

export default Search;