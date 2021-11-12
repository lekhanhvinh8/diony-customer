import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const unexpectedError =
      !error.response ||
      (error.response.status < 400 && error.response.status >= 500);

    if (unexpectedError) {
      toast.error("An unexpected error occurred");
    }

    return Promise.reject(error);
  }
);

export function setJwtHeader(jwt: string) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwtHeader,
};

export default http;
