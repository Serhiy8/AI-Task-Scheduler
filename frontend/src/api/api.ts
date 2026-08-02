import axios from "axios";

 export const api = axios.create({
    baseURL: 'https://ai-task-scheduler-8184.onrender.com/',
});

export const token = {
  set(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    delete api.defaults.headers.common.Authorization;
  },
};
