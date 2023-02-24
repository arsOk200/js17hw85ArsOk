import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/AppToolBar/AppToolBar";
import {Route, Routes} from "react-router-dom";
import Artists from "./containers/Artists";
import Albums from "./containers/Albums";

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
        </Routes>
      </Container>
    </>
  );
}

export default App;
