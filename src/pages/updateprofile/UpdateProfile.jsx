
import "./updateprofile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import EditProfile from "../../components/editProfile/EditProfile";


export default function UpdateProfile() {
  return (
    <div>
        <Topbar />
        <div className="homeContainer">
            <Sidebar />
            <EditProfile />
        </div>
    </div>
  )
}
