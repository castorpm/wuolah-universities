import type { QueryFunctionContext } from '@tanstack/react-query';
import type { Pagination } from 'types';
import axios from 'axios';

const BASE_URL = 'https://api.wuolah.com/v2';

const fetchFromBackend = (path: string) =>
  axios.get(`${BASE_URL}${path}`).then((res) => res.data);

export const fetchUniversities = (pagination: Pagination) =>
  axios
    .get(`${BASE_URL}/universities`, {
      params: {
        sort: 'name',
        pagination,
      },
    })
    .then((res) => res.data);

export const fetchUniversity = ({
  queryKey,
}: QueryFunctionContext<[string, { slug: string }]>) => {
  const [_key, { slug }] = queryKey;
  return fetchFromBackend(`/universities/${slug}`);
};
