import axios from 'axios';
import { getToken } from '@/helpers/token';

axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`;

export const add = (form) => {
  return axios.post(
    'http://localhost:3000/hotel/add',
    form,
  );
};

export const list = (data) => {
  return axios.get(
    'http://localhost:3000/hotel/list',
    {
      params: data,
    },
  );
};

export const remove = (id) => {
  return axios.delete(
    `http://localhost:3000/hotel/${id}`,
  )
};

export const updateCount = (data = {}) => {
  return axios.post(
    `http://localhost:3000/hotel/update/count`,
    data,
  )
};

export const update = (data = {}) => {
  return axios.post(
    `http://localhost:3000/hotel/update`,
    data,
  )
};

export const detail = (id) => {
  return axios.get(
    `http://localhost:3000/hotel/detail/${id}`,
  )
};