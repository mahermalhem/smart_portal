import {ENDPOINTS} from '_network/endpoints';
import httpClient from '_network/http';

const testApiService = async () => {
  const {data} = await httpClient.get(ENDPOINTS.testApi);
  return data;
};

export default testApiService;
