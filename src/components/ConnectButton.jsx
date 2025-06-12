import { Button } from '@shopify/polaris';
import { Redirect } from '@shopify/app-bridge/actions';
import { useState } from 'react';

export function ConnectButton({ app, shop, disabled = false }) {
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    if (!app || !shop || disabled) return;
    
    setLoading(true);
    try {
      const redirect = Redirect.create(app);
      redirect.dispatch(
        Redirect.Action.REMOTE,
        {
          url: `/auth?shop=${shop}`,
          newContext: true,
        }
      );
    } catch (error) {
      console.error('Redirect failed:', error);
      setLoading(false);
    }
  };

  return (
    <Button 
      primary 
      loading={loading} 
      onClick={handleConnect}
      disabled={disabled}
    >
      {shop ? `Connect to ${shop}` : 'Connect to Shopify'}
    </Button>
  );
}