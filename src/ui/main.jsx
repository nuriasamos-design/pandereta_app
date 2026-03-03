import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { PanderetaProvider } from '../context/PanderetaContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <PanderetaProvider>
            <App />
        </PanderetaProvider>
    </React.StrictMode>
);
