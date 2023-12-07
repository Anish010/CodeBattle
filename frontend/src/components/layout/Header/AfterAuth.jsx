import React, { Fragment } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Cookies from "js-cookie";
import Logout from "@mui/icons-material/Logout";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { BASE_URL } from "../../../services/rootServices";
import { logout } from "../../../reducers/userReducer";
// import axios from 'axios';

const AfterAuth = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();  
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openProfile = () => {
    navigate(`/profile/${userId}`)
  };

const handleLogout = async () => {
  try {
    // const response = await axios.post(`${BASE_URL}/logout`);
    // You can handle the response or any necessary actions after logout here.
    // console.log('Logged out successfully', response.data);
    localStorage.clear();
    Cookies.remove("authToken");
    dispatch(logout())
      navigate("/")
  } catch (error) {
    // Handle any errors that occur during the logout process.
    console.error('Error during logout:', error);
  }
  };
  
  const handleProlemsBtn = () => {
    navigate("/list")
  }

  const handleDiscussionBtn = () => {
    navigate("/discussion")
  }

  return (
    <Fragment>
      <ul className="nav-links">
        <li>
          <Button style={{ textTransform: "none" }} onClick={handleProlemsBtn}>Problems</Button>
        </li>
        <li>
          <Button style={{ textTransform: "none" }} onClick={handleDiscussionBtn}>Discussion</Button>
        </li>
      </ul>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, right: 25 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
                
            <div className="user-icon-background">
              <FaUserAlt className="UserIcon" />
            </div>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem onClick={openProfile} className = "my-profile-menu">
        My Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} className = "logout-menu">
          <ListItemIcon >
            <Logout className = "logout-icon" fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default AfterAuth;
