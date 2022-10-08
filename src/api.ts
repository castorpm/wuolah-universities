import axios from 'axios'

const BASE_URL = 'https://api.wuolah.com/v2'

const fetchFromBackend = (path: string) =>
  axios.get(`${BASE_URL}${path}`).then((res) => res.data)

export const fetchUniversities = () =>
  fetchFromBackend('/universities?sort=name')
