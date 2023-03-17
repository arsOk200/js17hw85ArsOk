import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import {User} from "../../types";
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {logout} from "../../features/user/userThunks";
import notImageAvailable from "../../assets/noImageAvailibleImages/No_Image_Available (1).jpg";
import {apiUrl} from "../../constants";


interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  let cardImage = notImageAvailable;
  if(user.image) {
    cardImage = apiUrl+'/'+user.image;
  }

  if(user.googleId && user.image) {
    cardImage = user.image;
  }
  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.displayName}
        <img style={{width:'30px', height:'30px', marginLeft:'13px', borderRadius:'50%'}} src={cardImage} alt={user.displayName}/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem component={NavLink} to='/track-history'>Track History</MenuItem>
        <MenuItem component={NavLink} to='/new-artist'>Add artist</MenuItem>
        <MenuItem component={NavLink} to='/new-album'>Add album</MenuItem>
        <MenuItem component={NavLink} to='/new-track'>Add track</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>

      </Menu>
    </>
  );
};

export default UserMenu;