import React from 'react';
import NewArtist from "../components/artists/NewArtist";
import {Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {ArtistMutation} from "../types";
import {useNavigate} from "react-router-dom";
import {createArtist} from "../features/artists/ArtistsThunks";
import {selectArtistCreating} from "../features/artists/ArtistsSlice";


const AddArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const creating = useAppSelector(selectArtistCreating);

  const onFormSubmit = async (ArtistMutation:ArtistMutation) => {
    try {
     await dispatch(createArtist(ArtistMutation)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Typography sx={{ mb: 2 }} variant="h4">
        New Artist
      </Typography>
      <NewArtist creating={creating} onSubmit={onFormSubmit}/>
    </>
  );
};

export default AddArtist;