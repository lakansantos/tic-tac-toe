export const ENV_ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
export const API_URL_LOCAL = process.env.NEXT_PUBLIC_API_URL_LOCAL;
export const API_URL_PRODUCTION = process.env.NEXT_PUBLIC_API_URL_PRODUCTION;
export const BASE_URL =
  ENV_ENVIRONMENT === 'production' ? API_URL_PRODUCTION : API_URL_LOCAL;

console.log(BASE_URL);
