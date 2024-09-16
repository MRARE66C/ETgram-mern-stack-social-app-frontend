import "./login.css";
import { useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: emailRef.current.value, password: passwordRef.current.value },
      dispatch
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  }

  console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ET-GRAM</h3>
          <span className="loginDesc">
            Social Network for KMITL-SIET.BTECH students
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" type= "email" required className="loginInput" ref={emailRef} />
            <input placeholder="Password" type="password" required minLength="6" className="loginInput" ref={passwordRef} />
            <button className="loginButton" type="submit" disabled = {isFetching}>
              {isFetching ? <CircularProgress color = "white" size={"20px"}/> 
              : "Log In"}
            </button>
            {error && <span className="loginError">{error}</span>}
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" onClick={handleRegister}>
              {isFetching ? <CircularProgress color = "white" size={"20px"}/> 
              : "Create a New Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
