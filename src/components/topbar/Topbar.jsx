import "./topbar.css";
import SearchBar from "../searchbar/SearchBar";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import SearchResultList from "../searchbar/SearchResultList";

export default function Topbar() {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [result, setResult] = useState([]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ET-GRAM</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <SearchBar setResult = {setResult} className="searchbar"/>
        <SearchResultList result = {result} className= "resultList"/>
      </div>
      <div className="topbarRight">
        {/* <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div> */}
        <div className="topbarIcons"> 
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">0</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">0</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">0</span>
          </div>
        </div>
        <NavLink to={`/profile/${user.username}`}>
          <img src= { user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" className="topbarImg"/>
        </NavLink>
      </div>
    </div>
  );
}
