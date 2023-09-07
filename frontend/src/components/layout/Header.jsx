import React, { useState } from "react";
import Lottie from "react-lottie";
import logoIcon from "../../animations/logo_icon.json";
import Button from "@mui/material/Button";
import SignUpModal from "../Modals/SignUpModal";
import LoginModal from "../Modals/LoginModal";

const Header = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const passwordValidationRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  //Handle close and open of Signup Modal
  const handleOpenSignUp = () => setOpenSignUp(true);
  const handleCloseSignUp = () => {
    setOpenSignUp(false);
    resetErrors();
  };

  //Handle close and open of Login Modal
const handleOpenLogin = () => setOpenLogin(true);
const handleCloseLogin = () => {
  setOpenLogin(false);
  resetErrors();
};

  const resetErrors = () => {
    setPasswordError("");
    setEmailError("");
    setConfirmPasswordError("");
  };

  const handleSignUpSubmit = () => {
    if (!emailValidationRegex.test(signUpData.email)) {
      setEmailError("Please enter a valid Gmail address.");
      console.log("Please enter a valid Gmail address.");
      return;
    }

    if (!passwordValidationRegex.test(signUpData.password)) {
      setPasswordError("Password does not meet the requirements.");
      console.log("Password does not meet the requirements.");
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      console.log("Passwords do not match.");
      return;
    }

    // Perform form submission logic for Sign Up
    console.log("Password meet the requirements.");
    console.log("Sign Up Data:", signUpData);
  };

  const handleLoginSubmit = () => {
    // Perform form submission logic for Login
    console.log("Login Data:", loginData);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: logoIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const customInputStyle = {
    // Define your custom input style here
    borderRadius: "6px",
  };

  const customButtonStyle = {
    backgroundColor: "#b061df",
    color: "#fff",
    width: "100%",
    height: "40px",
  };

  return (
    <>
      <nav className="navbar">
        <div className="navdiv">
          <div className="logo">
            CodeBattle
            <div className="logo-icon">
              <Lottie options={defaultOptions} height={90} width={90} />
            </div>
          </div>
          <ul className="nav-links">
            <li>
              <Button
                style={{ textTransform: "none" }}
                onClick={handleOpenSignUp}>
                SignUp
              </Button>
            </li>
            <SignUpModal
              openSignUp={openSignUp}
              handleCloseSignUp={handleCloseSignUp}
              handleSignUpSubmit={handleSignUpSubmit}
              signUpData={signUpData}
              setSignUpData={setSignUpData}
              emailError={emailError}
              setEmailError={setEmailError}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
              confirmPasswordError={confirmPasswordError}
              setConfirmPasswordError={setConfirmPasswordError}
              emailValidationRegex={emailValidationRegex}
              passwordValidationRegex={passwordValidationRegex}
              customInputStyle={customInputStyle}
              customButtonStyle={customButtonStyle}
            />
            <li>
              <Button
                style={{ textTransform: "none" }}
                onClick={handleOpenLogin}>
                Login
              </Button>
            </li>
            <LoginModal
              openLogin={openLogin}
              setOpenLogin={setOpenLogin}
              handleCloseLogin={handleCloseLogin}
              handleLoginSubmit={handleLoginSubmit}
              loginData={loginData}
              setLoginData={setLoginData}
              emailError={emailError}
              setEmailError={setEmailError}
              emailValidationRegex={emailValidationRegex}
              customInputStyle={customInputStyle}
              customButtonStyle={customButtonStyle}/>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
