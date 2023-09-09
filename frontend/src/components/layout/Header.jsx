import React, { useState } from "react";

import Lottie from "react-lottie";
import logoIcon from "../../animations/logo_icon.json";
import Button from "@mui/material/Button";
import SignUpModal from "../Modals/SignUpModal";
import LoginModal from "../Modals/LoginModal";
// import Alert from '@mui/material/Alert';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Header = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [successLoginSnackOpen, setSuccessLoginSnackOpen] = useState(false);
  const [successSignUpSnackOpen, setSuccessSignUpSnackOpen] = useState(false);

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

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessLoginSnackOpen(false);
    setSuccessSignUpSnackOpen(false);
  };


    //Handle close and successLoginSnackOpen of Signup Modal
  const handleOpenSignUp = () => setOpenSignUp(true);


  //Handle close and successLoginSnackOpen of Login Modal
  const handleOpenLogin = () => setOpenLogin(true);


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
              setOpenSignUp={setOpenSignUp}
              handleSignUpSuccess={handleSignUpSuccess}
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
              handleLoginSuccess={handleLoginSuccess}
              customInputStyle={customInputStyle}
              customButtonStyle={customButtonStyle}
            />
          </ul>
        </div>
        <Snackbar
          open={successLoginSnackOpen}
          autoHideDuration={4000}
          onClose={handleSnackClose}>
          <Alert
            onClose={handleSnackClose}
            severity="success">
            Login Successfully !
          </Alert>
        </Snackbar>
        <Snackbar
          open={successSignUpSnackOpen}
          autoHideDuration={4000}
          onClose={handleSnackClose}>
          <Alert
            onClose={handleSnackClose}
            severity="success">
            Register Successfully !
          </Alert>
        </Snackbar>
      </nav>
    </>
  );
};

export default Header;
