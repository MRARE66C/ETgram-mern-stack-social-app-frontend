import "./sidebar.css";
import { Home } from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

    function handleLogout() {
        navigate('/login');
        localStorage.clear();
        window.location.reload();
    }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
              <Link to="/" className="sidebarLink">
                <Home className="sidebarIcon" />
                <span className="sidebarListItemText">Home</span>
              </Link>
          </li>
        </ul>
        <button className="sidebarButton" onClick={handleLogout}>Logout</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
