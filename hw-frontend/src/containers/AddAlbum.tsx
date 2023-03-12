import React from 'react';
import {Typography} from "@mui/material";
import NewAlbum from "../components/albums/NewAlbum";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {useNavigate} from "react-router-dom";
import {AlbumMutation} from "../types";
import {createAlbum} from "../features/albums/albumThunks";
import {selectAlbumCreating} from "../features/albums/AlbumSlice";

const AddAlbum = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const creating = useAppSelector(selectAlbumCreating);

  const onFormSubmit = async (album:AlbumMutation) => {
    try {
      await dispatch(createAlbum(album)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Typography sx={{ mb: 2 }} variant="h4">
        New Album
      </Typography>
      <NewAlbum onSubmit={onFormSubmit} creating={creating}/>
    </>
  );
};

export default AddAlbum;