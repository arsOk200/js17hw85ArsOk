import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/AppToolBar/AppToolBar";
import {Route, Routes} from "react-router-dom";
import Artists from "./containers/Artists";
import Albums from "./containers/Albums";
import Tracks from "./containers/Tracks";
import Login from "./containers/Login";
import Register from "./containers/Register";
import TrackHistory from "./containers/trackHistory";
import AddArtist from "./containers/AddArtist";
import AddAlbum from "./containers/AddAlbum";
import AddTrack from "./containers/AddTrack";
function App() {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <Container maxWidth="xl">
        <Routes>
          <Route path='/' element={(<Artists/>)}/>
          <Route path='/:id' element={(<Albums/>)}/>
          <Route path={'/tracks/:id'} element={(<Tracks/>)}/>
          <Route path={'/new-artist'} element={(<AddArtist/>)}/>
          <Route path={'/new-album'} element={(<AddAlbum/>)}/>
          <Route path={'/new-track'} element={(<AddTrack/>)}/>
          <Route path='/login' element={(<Login/>)}/>
          <Route path='/register' element={(<Register/>)}/>
          <Route path='/track-history' element={(<TrackHistory/>)}/>
        </Routes>
      </Container>
    </>
  );
}
export default App;
