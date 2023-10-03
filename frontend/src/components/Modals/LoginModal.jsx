import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputComp from "../utils/InputComp";
import ButtonComp from "../utils/ButtonComp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/userReducer";
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

const LoginModal = ({
  setState,
  openLogin,
  handleLoginSuccess,
  customInputStyle,
  customButtonStyle,
}) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

    const handleCloseLogin = () => {
    setState("openLogin", false);
  };

  const handleLogin = () => {
  axios
    .post(`${BASE_URL}/login`, {
      email: loginData.email,
      password: loginData.password,
    })
    .then((response) => {
      console.log(response.data.user)
      handleLoginSuccess();
      const data = {
        username : response.data.user.username,
      email: response.data.user.email,
      id: response.data.user._id
    };
      dispatch(setUser(data))
      navigate("/list")
    })
    .catch((error) => {
      console.error("Login Error:", error.response.data);
      setLoginError(error.response.data.message); 
    });
};


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
          required={true}
          value={loginData.email}
          style={customInputStyle}
          onChange={(e) => {
            setLoginData({ ...loginData, email: e.target.value });
          }}
        />
        <InputComp
          label="Password"
          type="password"
          margin="normal"
          required={true}
          value={loginData.password}
          style={customInputStyle}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <ButtonComp
          text="Login"
          style={customButtonStyle}
          variant="contained"
          color="primary"
          onClick={handleLogin}
        />
        {loginError && (
          <Typography color="error" variant="body2">
            {loginError}
          </Typography>
        )}
        
      </Box>
       
    </Modal>
  );
};

export default LoginModal;