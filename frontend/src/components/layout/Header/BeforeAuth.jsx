import React from "react";
import SignUpModal from "../../Modals/SignUpModal";
import LoginModal from "../../Modals/LoginModal";
import Button from "@mui/material/Button";

const BeforeAuth = ({
  setSuccessLoginSnackOpen,
  setSuccessSignUpSnackOpen,
  setOpenLogin,
  setOpenSignUp,
  openLogin,
  openSignUp,
}) => {
  const handleLoginSuccess = () => {
    setSuccessLoginSnackOpen(true);
    setOpenLogin(false); // Close the modal
    // resetErrors();
  };

  const handleSignUpSuccess = () => {
    setSuccessSignUpSnackOpen(true);
    setOpenSignUp(false); // Close the modal
    // resetErrors();
  };

  //Handle close and successLoginSnackOpen of Signup Modal
  const handleOpenSignUp = () => setOpenSignUp(true);

  //Handle close and successLoginSnackOpen of Login Modal
  const handleOpenLogin = () => setOpenLogin(true);

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
        openSignUp={openSignUp}
        setOpenSignUp={setOpenSignUp}
        handleSignUpSuccess={handleSignUpSuccess}
        customInputStyle={customInputStyle}
        customButtonStyle={customButtonStyle}
      />

      <LoginModal
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
        handleLoginSuccess={handleLoginSuccess}
        customInputStyle={customInputStyle}
        customButtonStyle={customButtonStyle}
      />
    </ul>
  );
};

export default BeforeAuth;
