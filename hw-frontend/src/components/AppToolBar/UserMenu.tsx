import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import {User} from "../../types";
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {logout} from "../../features/user/userThunks";


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

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.displayName}
        <img style={{marginLeft:'13px',width:'30px', height:'30px',borderRadius:'50%'}} src={user.avatar} alt={user.displayName}/>
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