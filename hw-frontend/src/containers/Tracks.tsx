import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {Navigate, useParams} from "react-router-dom";
import TracksItem from "../components/tracks/tracksItem";
import {Grid} from "@mui/material";
import {selectTracks, selectTracksFetching} from "../features/tracks/TracksSlice";
import {addTrackToHistory, fetchTracks} from "../features/tracks/TracksThunks";
import Spinner from "../components/Spinner/Spinner";
import { selectOneAlbum, selectOneAlbumFetching} from "../features/albums/AlbumSlice";
import {fetchOneAlbum} from "../features/albums/albumThunks";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import notImageAvailable from "../assets/noImageAvailibleImages/No_Image_Available (1).jpg";
import {apiUrl} from "../constants";
import {selectUser} from "../features/user/userSlice";

const Tracks:React.FC = () => {
  const dispatch  = useAppDispatch();
  const user = useAppSelector(selectUser);
  const {id} = useParams() as { id: string };
  const tracks = useAppSelector(selectTracks);
  const album = useAppSelector(selectOneAlbum);
  const albumFetching = useAppSelector(selectOneAlbumFetching);
  const fetching = useAppSelector(selectTracksFetching);
  let cardImage = notImageAvailable;
  if(album?.image) {
    cardImage = apiUrl+'/'+album.image;
  }
  useEffect( () => {
   dispatch(fetchTracks(id));
   dispatch(fetchOneAlbum(id));
  },[dispatch, id]);

  const addTrack = async (id:string) => {
    dispatch(addTrackToHistory(id));
  }

  if(!user) {
    return <Navigate to='login'/>
  }

  return (
    <Grid  container flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Typography component="div" variant="h2" color='#b20909'>
        { albumFetching  ? <Spinner/> : album?.artist.name}
      </Typography>
      <Typography component="div" variant="h4">
        { albumFetching  ? <Spinner/> : album?.name}
      </Typography>
      <Typography component="div" variant="h5">
        { albumFetching  ? <Spinner/> : album?.year}
      </Typography>
      <Grid width='200px' height='200px'>
        <CardMedia
          sx={{width:'100%'}}
          component="img"
          height="100%"
          image={cardImage}
          alt={album?.name}
        />
      </Grid>
      <Grid container justifyContent='center'>
        {fetching ? <Spinner/> : tracks.map((track) => (
          <TracksItem duration={track.duration}
                      number={track.number}
                      name={track.name}
                      addTrack={()=> addTrack(track._id)}
                      key={track._id}
          />
        ))}
      </Grid>
    </Grid>

  );
};

export default Tracks;