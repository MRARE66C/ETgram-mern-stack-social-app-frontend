import "./searchbar.css";
import { Search } from "@material-ui/icons";
import { useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";

export default function SearchBar({setResult}) {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUsers = async (value) => {
    fetch("users/all")
      .then((res) => res.json())
      .then((json => {
        const result = json.filter((user) => {
          return value && user.username.toLowerCase().includes(value.toLowerCase());
        });
        setResult(result);  
      })) 
    
  };

  const handleChange = (value) => {
    setInput(value);
    fetchUsers(value);
  };

  return (
    <div>
      <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend"
            className="searchInput"
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
    </div>
  )
}
