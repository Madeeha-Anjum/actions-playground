import axios from 'axios';
import * as AxiosLogger from 'axios-logger';

const Api = axios.create({
  baseURL: 'https://fakerapi.it/api/v1',
});

Api.interceptors.request.use(AxiosLogger.requestLogger);
Api.interceptors.response.use(AxiosLogger.responseLogger);
export default Api;
