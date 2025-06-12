import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '@shopify/polaris';
import { createApp } from '@shopify/app-bridge';
import '@shopify/polaris/build/esm/styles.css';
import App from './App';

// Lấy thông số từ URL
const params = new URLSearchParams(window.location.search);
let host = params.get('host');

// Kiểm tra host trong localStorage nếu không có trong URL
if (!host) {
  host = localStorage.getItem('shopify-host');
}

// Chỉ khởi tạo App Bridge nếu có host
const appBridgeConfig = host ? {
  apiKey: process.env.REACT_APP_SHOPIFY_API_KEY,
  host: host,
  forceRedirect: true,
} : null;

const app = appBridgeConfig ? createApp(appBridgeConfig) : null;

// Lưu host vào localStorage để sử dụng sau
if (host) {
  localStorage.setItem('shopify-host', host);
}

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider i18n={{}}>
        <App app={app} host={host} />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);