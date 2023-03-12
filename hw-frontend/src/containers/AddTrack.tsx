import React from 'react';
import NewTrack from "../components/tracks/NewTrack";
import {Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {useNavigate} from "react-router-dom";
import {TrackMutation} from "../types";
import {createTrack} from "../features/tracks/TracksThunks";
import {creatingTrack} from "../features/tracks/TracksSlice";

const AddTrack = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const creating = useAppSelector(creatingTrack);
  const onFormSubmit = async (trackMutation:TrackMutation) => {
    try {
      await dispatch(createTrack(trackMutation)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Typography sx={{ mb: 2 }} variant="h4">
        New Track
      </Typography>
      <NewTrack creating={creating} onSubmit={onFormSubmit}/>
    </>
  );
};

export default AddTrack;