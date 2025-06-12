import { useEffect } from 'react';
import { Dashboard } from './pages/Dashboard';
import { ErrorPage } from './pages/ErrorPage';
import { useLocation } from 'react-router-dom';

export default function App({ app, host }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const shop = params.get('shop');

  // Redirect nếu có shop nhưng không có host
  useEffect(() => {
    if (shop && !host) {
      localStorage.setItem('shopify-shop-url', shop);
      window.location.href = `https://${shop}/admin/apps/${process.env.REACT_APP_SHOPIFY_API_KEY}`;
    }
  }, [shop, host]);

  if (!host) {
    return <ErrorPage message="Missing host parameter. Please reinstall the app from Shopify Admin or connect manually." />;
  }

  if (!app) {
    return <ErrorPage message="App Bridge initialization failed. Please refresh the page." />;
  }

  return (
    <div className="App">
      <Dashboard app={app} />
    </div>
  );
}