import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { 
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useEffect } from "react";

function RouteComponent() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && location.pathname === "/login") {
      navigate("/");
    }
  }, [user, navigate, location]);

  return (
    <Routes>
      <Route path="/" element={ user ? <Home /> : <Register /> }/>
      <Route path="/login" element={ user ? <></> : <Login /> }/>
      <Route path="/register" element={ user ? <></> : <Register /> }/>
      <Route path="/profile/:username" element={ <Profile /> }/>
    </Routes>
  );
}

function App() {
  return(
    <Router>
      <RouteComponent />
    </Router>
  );
}

export default App;
