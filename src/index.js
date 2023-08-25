import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';;
const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  palette: {

    exito: {
      main: '#58D68D',
      contrastText: '#fff',
    },
    delete: {
      main: '#EC7063',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
  },
});



root.render(
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
