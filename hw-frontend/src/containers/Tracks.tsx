import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {useParams} from "react-router-dom";
import TracksItem from "../components/tracks/tracksItem";
import {Grid} from "@mui/material";
import {selectTracks, selectTracksFetching} from "../features/tracks/TracksSlice";
import {fetchTracks} from "../features/tracks/TracksThunks";
import Spinner from "../components/Spinner/Spinner";

const Tracks:React.FC = () => {
  const dispatch  = useAppDispatch();
  const {id} = useParams() as { id: string };
  const tracks = useAppSelector(selectTracks);
  const fetching = useAppSelector(selectTracksFetching);

  useEffect(() => {
    dispatch(fetchTracks(id));
  },[dispatch]);

  return (
    <Grid container justifyContent='center'>
      {fetching ? <Spinner/> : tracks.map((track) => (
        <TracksItem duration={track.duration}
                    number={track.number}
                    name={track.name}
                    key={track._id}
        />
      ))}
    </Grid>
  );
};

export default Tracks;