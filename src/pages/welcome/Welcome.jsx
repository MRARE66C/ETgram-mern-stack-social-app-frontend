import { NavLink } from "react-router-dom";
import "./welcome.css";
import FeedStart from "../../components/feedforstart/FeedStart";

export default function Welcome() {
    const username = "thaboss";
  return (
    <div>
        <h1>Welcome to our Social Media App</h1>
        <NavLink to="/login">
            <button>Login</button>
        </NavLink>
        <NavLink to="/register">
            <button>Register</button>
        </NavLink>
        <FeedStart username={username} />
    </div>
  )
}