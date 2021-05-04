import {
  del, post, get
} from '@/helpers/request';
import axios from 'axios';

import { getToken } from '@/helpers/token';

axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`;

export const add = (form) => {
  return post(
    '/hotel/add',
    form,
  );
};

export const list = (data) => {
  return get(
    '/hotel/list',
    data
  );
};

export const remove = (id) => {
  return del(
    `/hotel/${id}`,
  )
};

export const updateCount = (data = {}) => {
  return post(
    `/hotel/update/count`,
    data,
  )
};

export const update = (data = {}) => {
  return post(
    `/hotel/update`,
    data,
  )
};

export const detail = (id) => {
  return get(
    `/hotel/detail/${id}`,
  )
};

export const addMany = (key) => {
  return post('/hotel/addMany', {
    key,
  });
};