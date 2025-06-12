import { Page, Card, Banner, Button } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';

export function ErrorPage({ message }) {
  const navigate = useNavigate();

  return (
    <Page title="Error">
      <Card sectioned>
        <Banner
          title="Something went wrong"
          status="critical"
        >
          <p>{message || 'We encountered an error while processing your request.'}</p>
        </Banner>
        <div style={{ marginTop: '20px' }}>
          <Button primary onClick={() => navigate('/')}>
            Try Again
          </Button>
        </div>
      </Card>
    </Page>
  );
}