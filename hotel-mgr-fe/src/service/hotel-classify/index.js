import {
  post, get, del
} from '@/helpers/request';


export const add = (title) => {
  return post('/hotel-classify/add', {
    title,
  });
};


export const list = () => {
  return get('/hotel-classify/list');
};

export const remove = (id) => {
  return del(`/hotel-classify/${id}`);
};

export const updateTitle = (id, title) => {
  return post('/hotel-classify/update/title', {
    id,
    title,
  });
};