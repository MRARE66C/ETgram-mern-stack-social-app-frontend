import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [Users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const username = useParams().username;

  useEffect(() => {
    const fetchUser= async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUsers(res.data);
      setIsLoading(false);
    }
    fetchUser();
  }, [username])

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={Users.coverPicture ? PF + Users.coverPicture : PF + "person/noCover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={Users.profilePicture ? PF + Users.profilePicture : PF + "person/noAvatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName"> {Users.displayName ? Users.displayName : Users.username}</h4>
                <span className="profileInfoDesc">{Users.desc}!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username = {username}/>
            <Rightbar user = {Users}/>
          </div>
        </div>
      </div>
    </>
  );
}
