import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Lottie from "react-lottie";
import logoIcon from "../../../animations/logo_icon.json";
import BeforeAuth from "./BeforeAuth";
import AfterAuth from "./AfterAuth";
// import Alert from '@mui/material/Alert';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@mui/material/Snackbar";
import "./Header.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Header = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [successLoginSnackOpen, setSuccessLoginSnackOpen] = useState(false);
  const [successSignUpSnackOpen, setSuccessSignUpSnackOpen] = useState(false);
  const location = useLocation();


  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessLoginSnackOpen(false);
    setSuccessSignUpSnackOpen(false);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: logoIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
          </div>{" "}
          {location.pathname === "/" ? (
            <BeforeAuth
              setSuccessLoginSnackOpen={setSuccessLoginSnackOpen}
              setSuccessSignUpSnackOpen={setSuccessSignUpSnackOpen}
              setOpenLogin={setOpenLogin}
              setOpenSignUp={setOpenSignUp}
              openSignUp={openSignUp}
              openLogin={openLogin}
            />
          ): <AfterAuth/>}
          
        </div>
        <Snackbar
          open={successLoginSnackOpen}
          autoHideDuration={4000}
          onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="success">
            Login Successfully !
          </Alert>
        </Snackbar>
        <Snackbar
          open={successSignUpSnackOpen}
          autoHideDuration={4000}
          onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="success">
            Register Successfully !
          </Alert>
        </Snackbar>
      </nav>
    </>
  );
};

export default Header;
