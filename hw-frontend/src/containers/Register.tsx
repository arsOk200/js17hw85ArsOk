import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {RegisterMutation} from "../types";
import {selectRegisterError} from "../features/user/userSlice";
import {register} from "../features/user/userThunks";
import FileInput from "../components/FileInput/FileInput";


const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    username:'',
    password:'',
    displayName:'',
    image:null,
  });

  const inputChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => ({...prevState,[name]:value}));
  }

  const submitFormHandler = async (event:React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
    } catch (e){
      console.log(e);
    }
  }
  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const getFieldError = (fieldName:string) => {
    try {
      return error?.errors[fieldName].message;
    } catch{
      return undefined;
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Registration 
        </Typography>
        <Box component="form"  onSubmit={submitFormHandler} sx={{mt: 3, }}>
          <Grid container sx={{flexDirection:'column'}} spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
                required
                label="Username"
                name="username"
                autoComplete="new-username"
                value={state.username}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={Boolean(getFieldError('displayName'))}
                helperText={getFieldError('displayName')}
                required
                label="Display name"
                name="displayName"
                value={state.displayName}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <FileInput
                onChange={fileInputChangeHandler}
                name="image" label="Avatar"/>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );

};

export default Register;