import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '@shopify/polaris';
import { createApp } from '@shopify/app-bridge';
import '@shopify/polaris/build/esm/styles.css';
import App from './App';

// Lấy thông số từ URL
const params = new URLSearchParams(window.location.search);
const host = params.get('host');
const apiKey = process.env.REACT_APP_SHOPIFY_API_KEY;

// Tạo app bridge instance
const appBridgeConfig = {
  apiKey,
  host,
  forceRedirect: true,
};

const app = createApp(appBridgeConfig);

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider i18n={{}}>
        <App app={app} />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);