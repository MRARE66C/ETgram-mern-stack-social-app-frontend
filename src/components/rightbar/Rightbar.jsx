import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect, useState} from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import {Add, Remove} from "@material-ui/icons";

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser?.followings?.includes(user?._id) || false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (user && user._id) {
          const friendList = await axios.get("/users/friends/" + user._id);
          setFriends(friendList.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFriends();
  }, [user]);

  const handleUpdateProfileClick = () => {
    navigate("/edit");
  };

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, { userId: currentUser._id });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, { userId: currentUser._id });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  

  const HomeRightbar = () => {

    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    if (!user) { // Check if user is defined
      return null; // or return a loading spinner, or some other placeholder
    }
    console.log(friends);

    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        {user.username === currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleUpdateProfileClick}>
          Update Profile
          </button>
          )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "."}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
          <NavLink to={"/profile/" + friend.username} style={{textDecoration: "none"}}>
            <div key={friend._id} className="rightbarFollowing">
              <img
                src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          </NavLink>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
