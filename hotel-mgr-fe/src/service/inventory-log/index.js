import {
  get
} from '@/helpers/request';

export const list = (type = 'IN_COUNT', page = 1, size = 5) => {
  return get(
    '/inventory-log/list', {
    type,
    page,
    size,
  }
  )
}