import React, {useEffect, useState} from 'react';
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import FileInput from "../FileInput/FileInput";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {AlbumMutation} from "../../types";
import {selectArtists} from "../../features/artists/ArtistsSlice";
import {fetchAllArtists} from "../../features/artists/ArtistsThunks";

interface Props{
  onSubmit:(mutation:AlbumMutation) => void;
  creating:boolean;
}

const NewAlbum:React.FC<Props> = ({onSubmit,creating}) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  const [state, setState] = useState<AlbumMutation>({
    name: '',
    artist:'',
    image: null,
    year:'',
  })

  useEffect(() => {
    dispatch(fetchAllArtists());
  }, [dispatch]);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };
  return (
    <form autoComplete="off"
          onSubmit={submitForm}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            select
            id="artist"
            label="Artist"
            value={state.artist}
            onChange={inputChange}
            required
            name="artist"
          >
            <MenuItem value="" disabled>
              Select an artist
            </MenuItem>
            {artists.map((artist) => (
              <MenuItem key={artist._id} value={artist._id}>
                {artist.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xl>
          <TextField id="name" label="Name"
                     value={state.name} onChange={inputChange}
                     name="name" required/>
        </Grid>
        <Grid item xs>
          <TextField id="year" label="Year"
                     value={state.year} onChange={inputChange}
                     name="year" required/>
        </Grid>
        <Grid item xl>
          <FileInput
            onChange={fileInputChangeHandler}
            name="image" label="Image"/>
        </Grid>
        <Grid item xl>
          <Button type="submit" color="primary" disabled={creating} variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewAlbum;