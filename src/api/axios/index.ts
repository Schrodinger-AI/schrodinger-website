/**
 * @description
 * 1. Init axios, config axios, make multiple hook instances, etc
 * Please get more config follow this URL https://www.npmjs.com/package/axios-hooks#useaxiosurlconfig-options
 * 2. Please invoke axiosInit before any usages of the useAxios hook
 */
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';
import Axios from 'axios';
import { BASE_API_URL, BASE_CMS_URL } from '@/api/constants';
import { interceptorsBind } from './utils';
import { create } from 'apisauce';

// Please invoke axiosInit before any usages of the useAxios hook
export default function initAxios() {
  const axios = Axios.create({
    baseURL: BASE_CMS_URL,
    timeout: 50000,
  });
  interceptorsBind(axios);

  const cache = new LRU({ max: 10 });

  configure({ axios, cache });
}

const api = create({
  baseURL: BASE_CMS_URL,
});

const serveApi = create({
  baseURL: BASE_API_URL,
});

const get = async (url: string, params?: any, config?: any) => {
  const res = await api.get(url, params, config);
  if (res.ok) {
    return res.data as any;
  } else {
    throw Error('fetch failed, please try again');
  }
};

const serveGet = async (url: string, params?: any, config?: any) => {
  const res = await serveApi.get(url, params, config);

  const data = res?.data as unknown as {
    code: string;
    data: any;
    message: string;
  };
  if (res.ok && data?.code === '20000') {
    return data.data as any;
  } else {
    throw Error('fetch failed, please try again');
  }
};

export { get, serveGet };
