import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
const AxiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  return AxiosSecure;
};

export default useAxiosSecure;
