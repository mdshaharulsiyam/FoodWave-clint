import axios from 'axios';
    const axiosrequest = axios.create({
        // baseURL: 'https://serverfood-58brodqha-mdshaharulsiyams-projects.vercel.app', //localhost:5173
        baseURL: 'https://serverfood.vercel.app', 
        withCredentials: true,
      })

const useAxiosConfig = () => {
  return axiosrequest
}

export default useAxiosConfig
