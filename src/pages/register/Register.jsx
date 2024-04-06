import "./register.css";
import { useRef } from "react";
import { registerCall } from "../../apiCalls";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordAgainRef = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if(passwordAgainRef.current.value !== passwordRef.current.value){
      passwordAgainRef.current.setCustomValidity("Passwords don't match!");
    }
    else{
      const user = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      try{
        await axios.post("/auth/register", user);
        navigate("/login");
      }
      catch(err){
        console.log(err);
      }
    }
  }

  const handleLoginRedirect = () => {
    navigate("/login");
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">KMITL-SIET.BTECH</h3>
          <span className="loginDesc">
            Social Network for KMITL-SIET.BTECH students
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" required ref={usernameRef} className="loginInput" />
            <input placeholder="Email" type="email" required ref={emailRef} className="loginInput" />
            <input placeholder="Password" type="password" required minLength="6" ref={passwordRef} className="loginInput" />
            <input placeholder="Password Again" type="password" required minLength="6" ref={passwordAgainRef} className="loginInput" />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton" onClick={handleLoginRedirect}>
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
