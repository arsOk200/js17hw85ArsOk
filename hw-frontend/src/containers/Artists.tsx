import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import ArtistItem from "../components/artists/artistItem";
import {selectArtists, selectArtistsFetching} from "../features/artists/ArtistsSlice";
import {fetchAllArtists} from "../features/artists/ArtistsThunks";
import Spinner from "../components/Spinner/Spinner";

const Artists:React.FC = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const fetching = useAppSelector(selectArtistsFetching);

  useEffect(() => {
    dispatch(fetchAllArtists());
  },[dispatch])

  return (
    <Grid container justifyContent={'center'} flexDirection={'row'}>
      {fetching ? <Spinner/> : artists.map((artist) => (
        <ArtistItem description={artist.description}
                    image={artist.image}
                    id={artist.id}
                    name={artist.name}
                    key={artist.id}
        />
      ))}
    </Grid>
  );
};

export default Artists;