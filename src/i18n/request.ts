import { getRequestConfig } from 'next-intl/server';
import enMessages from '../../messages/en.json';
import esMessages from '../../messages/es.json';

export default getRequestConfig(async () => {
  const locale = process.env.NEXT_PUBLIC_APP_LOCALE || 'en';
  const messages = locale === 'es' ? esMessages : enMessages;

  return {
    locale,
    messages
  };
});
