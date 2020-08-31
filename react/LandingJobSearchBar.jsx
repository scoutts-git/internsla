import React, { Component } from "react";
import "./Search.css";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";

class JobSearchBar extends Component {
  state = {
    query: "",
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleClick = () => {
    this.props.searchJobs(this.state.query);
  };
  render() {
    return (
      <div className="search-box d-flex justify-content-between align-self-end">
        <input
          className="search-txt"
          type="text"
          name="search"
          placeholder="Job, Organization, Location"
          autoComplete="off"
          onChange={this.handleChange}
        ></input>
        <div
          className="search-btn align-self-center "
          onClick={this.handleClick}
        >
          <FaSearch size="25" />
        </div>
      </div>
    );
  }
}

JobSearchBar.propTypes = {
  searchJobs: PropTypes.func,
};

export default JobSearchBar;
