export const validateShopUrl = (url) => {
  // Remove protocol and domain if present
  const cleanedUrl = url
    .replace(/https?:\/\//, '')
    .replace('.myshopify.com', '')
    .trim();

  // Shopify shop name requirements:
  // - Only letters, numbers and hyphens
  // - Cannot start or end with hyphen
  // - Minimum 2 characters
  const regex = /^[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]$/;
  return cleanedUrl.length >= 2 && regex.test(cleanedUrl);
};

export const formatShopUrl = (url) => {
  const cleaned = url.replace(/https?:\/\//, '').replace('.myshopify.com', '');
  return `${cleaned}.myshopify.com`;
};