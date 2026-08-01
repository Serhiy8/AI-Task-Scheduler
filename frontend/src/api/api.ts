import axios from "axios";

 export const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const token = {
  set(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    delete api.defaults.headers.common.Authorization;
  },
};
