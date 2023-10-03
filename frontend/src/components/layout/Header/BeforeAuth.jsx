import React from "react";
import SignUpModal from "../../Modals/SignUpModal";
import LoginModal from "../../Modals/LoginModal";
import Button from "@mui/material/Button";

const BeforeAuth = ({
  setState,
  openLogin,
  openSignUp,
}) => {
  const handleLoginSuccess = () => {
    setState("successLoginSnackOpen", true);
    setState("openLogin", false); // Close the modal
    // resetErrors();
  };

  const handleSignUpSuccess = () => {
    setState("successSignUpSnackOpen", true);
    setState("openSignUp", false); // Close the modal
    // resetErrors();
  };

  //Handle close and successLoginSnackOpen of Signup Modal
  const handleOpenSignUp = () => setState("openSignUp", true);

  //Handle close and successLoginSnackOpen of Login Modal
  const handleOpenLogin = () => setState("openLogin", true);

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
    <ul className="nav-links">
      <li>
        <Button style={{ textTransform: "none" }} onClick={handleOpenSignUp}>
          SignUp
        </Button>
      </li>

      <li>
        <Button style={{ textTransform: "none", marginRight: "40px" }} onClick={handleOpenLogin}>
          Login
        </Button>
      </li>

      <SignUpModal
        setState={setState}
        openSignUp={openSignUp}
        handleSignUpSuccess={handleSignUpSuccess}
        customInputStyle={customInputStyle}
        customButtonStyle={customButtonStyle}
      />

      <LoginModal
        openLogin={openLogin}
        setState={setState}
        handleLoginSuccess={handleLoginSuccess}
        customInputStyle={customInputStyle}
        customButtonStyle={customButtonStyle}
      />
    </ul>
  );
};

export default BeforeAuth;
