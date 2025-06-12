import { Page, Card, Banner, TextField, Layout,Button,Text } from '@shopify/polaris';
import { useState } from 'react';
import { ConnectButton } from '../components/ConnectButton';

export function Dashboard({ app }) {
  const params = new URLSearchParams(window.location.search);
  const [shopUrl, setShopUrl] = useState('');
  const [manualConnect, setManualConnect] = useState(false);
  const shop = params.get('shop') || '';

  const handleShopUrlChange = (value) => {
    setShopUrl(value.replace(/https?:\/\//, '').replace('.myshopify.com', ''));
  };

  const isValidShop = (url) => {
    return /^[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]$/.test(url);
  };

  return (
    <Page title="Shopify App Dashboard">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            {shop ? (
              <>
                <Banner status="success">
                  <p>Connected to shop: {shop}.myshopify.com</p>
                </Banner>
                <ConnectButton app={app} shop={shop} />
              </>
            ) : (
              <>
                <Banner status="info">
                  <p>No active shop connection</p>
                </Banner>
                
                {!manualConnect ? (
                  <div style={{ marginTop: '20px' }}>
                    <Button primary onClick={() => setManualConnect(true)}>
                      Connect manually
                    </Button>
                  </div>
                ) : (
                  <div style={{ 
  marginTop: '20px',
  padding: '20px',
  border: '1px solid #dfe3e8',
  borderRadius: '4px'
}}>
  <Text variant="headingMd" as="h3">Manual Connection</Text>
  <div style={{ margin: '15px 0' }}>
    <TextField
      label="Enter your Shopify store name"
      value={shopUrl}
      onChange={handleShopUrlChange}
      placeholder="your-store-name"
      prefix="https://"
      suffix=".myshopify.com"
      autoComplete="off"
      helpText="Enter just your store name without .myshopify.com"
    />
  </div>
  <ConnectButton 
    app={app} 
    shop={isValidShop(shopUrl) ? `${shopUrl}.myshopify.com` : null} 
    disabled={!isValidShop(shopUrl)}
  />
</div>
                )}
              </>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}