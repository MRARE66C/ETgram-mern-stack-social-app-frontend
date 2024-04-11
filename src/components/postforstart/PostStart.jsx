import "./poststart.css";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function PostStart({ post }) {
    const [Users, setUsers] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    useEffect(() => {
      const fetchUser= async () => {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUsers(res.data);
      }
      fetchUser();
    }, [post.userId])
  
    return (
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to= {`profile/${Users.username}`}>
                <img
                  className="postProfileImg"
                  src={Users.profilePicture ? PF+Users.profilePicture : PF+"person/noAvatar.png"}
                  alt=""
                />
              </Link>
              <span className="postUsername">
                {Users.username}
              </span>
              <span className="postDate"> {format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img className="postImg" src={PF+post.img} alt="" />
          </div>
        </div>
      </div>
    );
}
