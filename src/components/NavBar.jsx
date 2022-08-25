import React from "react";
import "../css/NavBar.css";
import Search from "./Search";
import logo from "../resources/weather-icon.png";
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header>
        <img className="logo" src={logo}></img>
        <nav>
          <ul className="nav_links">
            <li>
              <a href="#">Item</a>
            </li>
            <li>
              <a href="#">Item</a>
            </li>
            <li>
              <a href="#">Item</a>
            </li>
            <Search></Search>
          </ul>
        </nav>
        {/* <a className="cta" href="#"><button>Search</button></a> */}
      </header>
    );
  }
}
