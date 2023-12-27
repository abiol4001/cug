import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://assessmentapi-001-site1.htempurl.com",
});

const setAuthToken = (token: string) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export { axiosInstance, setAuthToken };
