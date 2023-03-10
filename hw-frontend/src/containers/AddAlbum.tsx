import React from 'react';
import {Typography} from "@mui/material";
import NewAlbum from "../components/albums/NewAlbum";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {useNavigate} from "react-router-dom";
import {selectArtistCreating} from "../features/artists/ArtistsSlice";
import {AlbumMutation} from "../types";
import {createAlbum} from "../features/albums/albumThunks";

const AddAlbum = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const creating = useAppSelector(selectArtistCreating);

  const onFormSubmit = async (album:AlbumMutation) => {
    try {
      await dispatch(createAlbum(album));
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