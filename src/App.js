import './App.css';
import Tunner from './components/Tunner';
import {Paper} from '@material-ui/core';
import {ThemeProvider, createTheme} from '@material-ui/core/styles'
import React, { useState } from 'react';




function App() {

  const [darkMode, setDarkMode] = useState(true);
  
  const theme = createTheme({
    palette:{
      type: darkMode ? "dark" : "light",
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Paper className="App">
        <Tunner/>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
