// This file securely retrieves API keys from environment variables.
// It helps keep sensitive information out of the source code.

// To add your keys:
// 1. Open the `.env` file in the root of your project.
// 2. Add the following lines, replacing the placeholder values with your actual keys:
// GNEWS_API_KEY=your_gnews_api_key
// NEWSDATA_API_KEY=your_newsdata_api_key
// THENEWSAPI_API_TOKEN=your_thenewsapi_token

export const gnewsApiKey = process.env.GNEWS_API_KEY || '';
export const newsdataApiKey = process.env.NEWSDATA_API_KEY || '';
export const thenewsapiToken = process.env.THENEWSAPI_API_TOKEN || '';
