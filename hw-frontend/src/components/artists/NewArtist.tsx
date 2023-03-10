import React, {useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";
import FileInput from "../FileInput/FileInput";
import {ArtistMutation} from "../../types";
interface Props{
  onSubmit:(mutation:ArtistMutation) => void;
  creating:boolean;
}

const NewArtist: React.FC<Props> = ({onSubmit,creating}) => {

  const [state, setState] = useState<ArtistMutation>({
    name: '', description: '', image: null,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);

  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState((prevState) => {
      return {...prevState, [name]: value};
    });
  };
  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState((prevState) => ({
      ...prevState, [name]: files && files[0] ? files[0] : null,
    }));
  };
  return (<form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xl>
          <TextField id="name" label="Name"
                     value={state.name} onChange={inputChangeHandler}
                     name="name" required/>
        </Grid>

        <Grid item width={'70%'} minHeight={'50%'}>
          <TextField id="description" label="Description" fullWidth
                     value={state.description} onChange={inputChangeHandler}
                     name="description" required/>
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
    </form>);
};

export default NewArtist;