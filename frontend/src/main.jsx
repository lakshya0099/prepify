import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { InterviewProvider } from './context/InterviewContext'; 
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
    <InterviewProvider> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InterviewProvider>
    </ThemeProvider>
  </StrictMode>
);
