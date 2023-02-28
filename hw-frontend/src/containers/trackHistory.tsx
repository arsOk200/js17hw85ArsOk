import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectUser} from "../features/user/userSlice";
import {selectHistory, selectHistoryLoading} from "../features/tracks/TracksSlice";
import {fetchTrackHistory} from "../features/tracks/TracksThunks";
import Spinner from "../components/Spinner/Spinner";
import {Grid, Typography} from "@mui/material";
import TracksHistoryItem from "../components/tracks/TracksHistoryItem";
import {Navigate} from "react-router-dom";
import {User} from "../types";

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const history = useAppSelector(selectHistory);
  const fetching = useAppSelector(selectHistoryLoading);
  let confirmUser:User;
if(user) {
  confirmUser = user
}

  useEffect(() => {
    dispatch(fetchTrackHistory(confirmUser.token));
  },[dispatch]);

  if(!user) {
    return <Navigate to='/login'/>
  }

  return (
    <>
      <Typography component="h1" variant="h3">
        History
      </Typography>
      <Grid container justifyContent='center'>
        {fetching ? <Spinner/> : history.map((track) => (
          <TracksHistoryItem
                      duration={track.track.duration}
                      datetime={track.datetime}
                      name={track.track.name}
                      key={track._id}
          />
        ))}
      </Grid>
      </>
  );
};

export default TrackHistory;