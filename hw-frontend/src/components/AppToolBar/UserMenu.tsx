import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import {User} from "../../types";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {logout} from "../../features/user/userThunks";


interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem><NavLink style={{color:'black', textDecoration:'none'}} to='/track-history'>Track History</NavLink></MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>

      </Menu>
    </>
  );
};

export default UserMenu;