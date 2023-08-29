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


const LoginModal = ({
  handleCloseLogin,
  openLogin,
  loginData,
  setLoginData,
  handleLoginSubmit,
  emailError,
  setEmailError,
  emailValidationRegex,
  customInputStyle,
  customButtonStyle,
}) => {
  return (
    <Modal
      open={openLogin}
      onClose={handleCloseLogin}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Login
        </Typography>
        <InputComp
          label="Email address"
          type="text"
          margin="normal"
          required="true"
          value={loginData.email}
          style={customInputStyle}
          error={emailError}
          onChange={(e) => {
            const email = e.target.value;
            if (!emailValidationRegex.test(email) && email !== "") {
              setEmailError("Please enter a valid Gmail address.");
            } else {
              setEmailError("");
            }
            setLoginData({ ...loginData, email }); // Update loginData email
          }}
        />
        <InputComp
          label="Password"
          type="password"
          margin="normal"
          required="true"
          value={loginData.password}
          style={customInputStyle}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value }) // Update loginData password
          }
        />
        <ButtonComp
          text="Login"
          style={customButtonStyle}
          variant="contained"
          color="primary"
          onClick={handleLoginSubmit}
        />
      </Box>
    </Modal>
  );
};

export default LoginModal;
