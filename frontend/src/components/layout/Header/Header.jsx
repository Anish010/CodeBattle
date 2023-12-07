import React from "react";
import { useLocation } from "react-router-dom";
import Lottie from "react-lottie";
import logoIcon from "../../../animations/logo_icon.json";
import BeforeAuth from "./BeforeAuth";
import AfterAuth from "./AfterAuth";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@mui/material/Snackbar";
import useMultipleState from "../../../customHooks/useMultipleState";
import "./Header.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Header = () => {
  const location = useLocation();

  const initialState = {
    openSignUp: false,
    openLogin: false,
    successLoginSnackOpen: false,
    failureLoginSnackOpen: false,
    successSignUpSnackOpen: false,
    failureSignUpSnackOpen: false,
  };

  const [state, setState] = useMultipleState(initialState);

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState("successLoginSnackOpen", false);
    setState("successSignUpSnackOpen", false);
    setState("failureLoginSnackOpen", false);
    setState("failureSignUpSnackOpen", false);
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
              setState={setState}
              openSignUp={state.openSignUp}
              openLogin={state.openLogin}
            />
          ) : (
            <AfterAuth/>
          )}
        </div>
        <Snackbar
          open={state.successLoginSnackOpen}
          autoHideDuration={4000}
          onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="success">
            Login Successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={state.failureLoginSnackOpen}
          autoHideDuration={4000}
          onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="error">
            Login Failed!
          </Alert>
        </Snackbar>
        <Snackbar
          open={state.successSignUpSnackOpen}
          autoHideDuration={4000}
          onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="success">
            Register Successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={state.failureSignUpSnackOpen}
          autoHideDuration={4000}
          onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="error">
            Registered Failed!
          </Alert>
        </Snackbar>
        <Snackbar
          open={state.successLogoutSnackOpen} // Use successLogoutSnackOpen
          autoHideDuration={4000}
          onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="success">
            Logout Successfully!
          </Alert>
        </Snackbar>
      </nav>
    </>
  );
};

export default Header;
