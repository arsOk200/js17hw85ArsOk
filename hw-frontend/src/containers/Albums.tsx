import React, {useEffect} from 'react';
import Spinner from "../components/Spinner/Spinner";
import {Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectAlbums, selectAlbumsFetching} from "../features/albums/AlbumSlice";
import AlbumsItem from "../components/albums/albumsItem";
import {useParams} from "react-router-dom";
import {fetchAlbums} from "../features/albums/albumThunks";
import Typography from "@mui/material/Typography";

const Albums = () => {
  const dispatch  = useAppDispatch();
  const {id} = useParams() as { id: string };
  const fetching = useAppSelector(selectAlbumsFetching);
  const albums = useAppSelector(selectAlbums);

  useEffect( () => {
    dispatch(fetchAlbums(id));
  },[dispatch,id])
  return (
    <Grid>
      <Typography gutterBottom variant="h3">
        {albums[0].artist.name}
      </Typography>
      <Grid container justifyContent={'center'} flexDirection={'row'}>
      {fetching ? <Spinner/> : albums.map((album) => (
        <AlbumsItem year={album.year}
                    image={album.image}
                    id={album._id}
                    name={album.name}
                    key={album._id}
        />
      ))}
    </Grid></Grid>

  );
};

export default Albums;