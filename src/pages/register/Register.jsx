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
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const monthRef = useRef();
  const dayRef = useRef();
  const yearRef = useRef();

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
        displayName: firstNameRef.current.value + " " + lastNameRef.current.value,
        dateOfBirth: new Date(yearRef.current.value, monthRef.current.value, dayRef.current.value),
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
          <form className="RegisterBox" onSubmit={handleClick}>
            <input placeholder="Username" required ref={usernameRef} className="RegisterInput" />
            <input placeholder="Email" type="email" required ref={emailRef} className="RegisterInput" />
            <input placeholder="Password" type="password" required minLength="6" ref={passwordRef} className="RegisterInput" />
            <input placeholder="Confirm Password" type="password" required minLength="6" ref={passwordAgainRef} className="RegisterInput" />
            <div className="inputWrapper">
              <input placeholder="First Name"type="text" ref={firstNameRef} required className="RegisterInputs"/>
              <input placeholder="Last Name"type="text"  ref={lastNameRef} required className="RegisterInputs" />
            </div>
            <div className="inputWrapper">
              <select placeholder="Month" ref={monthRef} required className="Inputmonth">
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <select placeholder="Day" ref={dayRef} required className="InputDY">
                <option value="" className=".selectMonthDayYear">Select Day</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <select placeholder="Year" ref={yearRef} required className="InputDY ">
                <option value="">Select Year</option>
                {Array.from({ length: 65 }, (_, i) => 1960 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <button className="loginButton" type="submit">Sign Up</button>
            <span className="registerForgot">You already have an account please, Sign in?</span>
            <button className="loginRegisterButton" onClick={handleLoginRedirect}>
              Log in to Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
