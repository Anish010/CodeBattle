import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputComp from "../utils/InputComp";
import ButtonComp from "../utils/ButtonComp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../services/rootServices";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(255, 255, 255, 0.9)", // Change the background color with opacity
  border: "3px solid #b061df",
  borderRadius: "15px",
  boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
  p: 4,
};

const SignUpModal = ({
  openSignUp,
  setState,
  handleSignUpSuccess,
  customInputStyle,
  customButtonStyle,
}) => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // eslint-disable-next-line
  const [signUpError, setSignUpError] = useState(null);
  const navigate = useNavigate();

  const passwordValidationRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const resetErrors = () => {
    setPasswordError("");
    setEmailError("");
    setConfirmPasswordError("");
  };

  const handleCloseSignUp = () => {
    setState("openSignUp", false);
    resetErrors();
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

    axios
      .post(`${BASE_URL}/register`, {
        username: signUpData.username,
        email: signUpData.email,
        password: signUpData.password,
      })
      .then((response) => {
        handleSignUpSuccess();
        navigate("/list");
      })
      .catch((error) => {
        console.error("SignUp Error:", error.response.data);
        setSignUpError(error.response.data.message);
      });
  };

  return (
    <Modal
      open={openSignUp}
      onClose={handleCloseSignUp}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Register your Account
        </Typography>
        <InputComp
          label="Username"
          type="text"
          margin="normal"
          required={true}
          style={customInputStyle}
          value={signUpData.username}
          onChange={(e) =>
            setSignUpData({ ...signUpData, username: e.target.value })
          }
        />

        <InputComp
          label="Email address"
          type="email"
          margin="normal"
          required={true}
          style={customInputStyle}
          error={emailError}
          onChange={(e) => {
            const email = e.target.value;
            if (!emailValidationRegex.test(email) && email !== "") {
              setEmailError("Please enter a valid Gmail address.");
            } else {
              setEmailError("");
            }
            setSignUpData({ ...signUpData, email });
          }}
        />
        <InputComp
          label="Password"
          type="password"
          margin="normal"
          required={true}
          style={customInputStyle}
          error={passwordError}
          onChange={(e) => {
            const password = e.target.value;
            if (!passwordValidationRegex.test(password) && password !== "") {
              setPasswordError(
                "Password must have at least eight characters, one number, one lowercase and one uppercase letter, and one special character."
              );
            } else {
              setPasswordError("");
            }
            setSignUpData({ ...signUpData, password });
          }}
        />
        <InputComp
          label="Confirm Password"
          type="password"
          margin="normal"
          required={true}
          style={customInputStyle}
          error={confirmPasswordError}
          onChange={(e) => {
            const confirmPassword = e.target.value;
            if (signUpData.password !== confirmPassword) {
              setConfirmPasswordError("Passwords do not match.");
            } else {
              setConfirmPasswordError("");
            }
            setSignUpData({
              ...signUpData,
              confirmPassword,
            });
          }}
        />
        <ButtonComp
          text="Register"
          style={customButtonStyle}
          variant="contained"
          color="primary"
          onClick={handleSignUpSubmit}
        />
      </Box>
    </Modal>
  );
};

export default SignUpModal;
