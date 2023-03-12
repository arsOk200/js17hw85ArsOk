import React, {useEffect, useState} from 'react';
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {TrackMutation} from "../../types";
import {selectAlbumsWithoutID} from "../../features/albums/AlbumSlice";
import {fetchAllAlbums} from "../../features/albums/albumThunks";
interface Props{
  onSubmit:(mutation:TrackMutation) => void;
  creating:boolean
}

const NewTrack:React.FC<Props> = ({onSubmit,creating}) => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbumsWithoutID);

  const [state, setState] = useState<TrackMutation>({
    name: '',
    album:'',
    duration:'',
    number:'',
  })

  useEffect(() => {
    dispatch(fetchAllAlbums());
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

  return (
    <form autoComplete="off"
          onSubmit={submitForm}
     >
      <Grid container direction="column" spacing={2}>
        <Grid item width={'30%'}>
          <TextField
            fullWidth
            select
            id="album"
            label="Album"
            value={state.album}
            onChange={inputChange}
            required
            name="album"
          >
            <MenuItem value="" disabled>
              Select an album
            </MenuItem>
            {albums.map((album) => (
              <MenuItem key={album._id} value={album._id}>
                {album.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xl>
          <TextField id="name" label="Name of track"
                     value={state.name} onChange={inputChange}
                     name="name" required/>
        </Grid>
        <Grid item xs>
          <TextField id="duration" label="Duration"
                     value={state.duration} onChange={inputChange}
                     name="duration" required/>
        </Grid>
        <Grid item xs>
          <TextField id="number" label="Number in album"
                     type={'number'}
            value={state.number} onChange={inputChange}
                     name="number" required/>
        </Grid>
        <Grid item xl>
          <Button type="submit" color="primary"
                  disabled={creating}
                  variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewTrack;