import React from 'react';
import NewTrack from "../components/tracks/NewTrack";
import {Typography} from "@mui/material";

const AddTrack = () => {
  return (
    <>
      <Typography sx={{ mb: 2 }} variant="h4">
        New Track
      </Typography>
      <NewTrack/>
    </>
  );
};

export default AddTrack;