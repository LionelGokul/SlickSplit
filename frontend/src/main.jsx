import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import { MaterialTailwindControllerProvider } from '@/context';
import '../public/css/tailwind.css';
import Loader from './widgets/loader/spinner';
import { AlertMessage } from './widgets/alerts/alert';
import { DialogBox } from './widgets/dialogBox/dialogBox';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <Loader />
          <AlertMessage />
          <DialogBox />
          <App />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
