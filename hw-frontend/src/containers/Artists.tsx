import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import ArtistItem from "../components/artists/artistItem";
import {selectArtists, selectArtistsFetching} from "../features/artists/ArtistsSlice";
import {fetchAllArtists} from "../features/artists/ArtistsThunks";
import Spinner from "../components/Spinner/Spinner";
import {Navigate} from "react-router-dom";
import {selectUser} from "../features/user/userSlice";

const Artists:React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const artists = useAppSelector(selectArtists);
  const fetching = useAppSelector(selectArtistsFetching);

  useEffect(() => {
    dispatch(fetchAllArtists());
  },[dispatch]);

  if(!user) {
    return <Navigate to='/login'/>
  }


  return (
    <Grid container justifyContent={'center'} flexDirection={'row'}>
      {fetching ? <Spinner/> : artists.map((artist) => (
        <ArtistItem description={artist.description}
                    image={artist.image}
                    id={artist._id}
                    name={artist.name}
                    key={artist._id}
        />
      ))}
    </Grid>
  );
};

export default Artists;