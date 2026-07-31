import { getRequestConfig } from 'next-intl/server';
import enMessages from '../../messages/en.json';

export default getRequestConfig(async () => {
  return {
    locale: process.env.NEXT_PUBLIC_APP_LOCALE || 'en',
    messages: enMessages
  };
});
