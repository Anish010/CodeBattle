import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputComp from "../utils/InputComp";
import ButtonComp from "../utils/ButtonComp";

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
  handleCloseSignUp,
  handleSignUpSubmit,
  signUpData,
  setSignUpData,
  emailError,
  setEmailError,
  passwordError,
  setPasswordError,
  confirmPasswordError,
  setConfirmPasswordError,
  emailValidationRegex,
  passwordValidationRegex,
  customInputStyle,
  customButtonStyle,
}) => {
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
          required="true"
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
          required="true"
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
          required="true"
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
          required="true"
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
