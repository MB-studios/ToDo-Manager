import createClient from 'openapi-fetch';
import type { paths } from './v1';

const client = createClient<paths>({ baseUrl: 'http://192.168.86.1:3000/api' });
export default client;
