import axios from 'axios';
    const axiosrequest = axios.create({
        // baseURL: 'http://localhost:5000',
        baseURL: 'https://serverfood.vercel.app', 
        withCredentials: true,
      })

const useAxiosConfig = () => {
  return axiosrequest
}

export default useAxiosConfig
