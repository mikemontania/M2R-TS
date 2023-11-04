import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { URL_BASE } from '../Config/Config';
import './AxiosInteceptor';
 
// Función para hacer una solicitud GET
export const get = (url: string, params: any = {}, headers: any = {}) => {
  return axios.get(URL_BASE + url, { params, headers });
};
// Función para hacer una solicitud POST
export const post = (url: string, data: any = {}, headers: any = {}) => {
  return axios.post(URL_BASE + url, data, { headers });
};
// Función para hacer una solicitud PUT
export const put = (url: string, data: any = {}, headers: any = {}) => {
  return axios.put(URL_BASE + url, data, { headers });
};
// Función para hacer una solicitud DELETE
export const remove = (url: string, headers: any = {}) => {
  return axios.delete(URL_BASE + url, { headers });
};



const AxiosExample = () => {
  const [data, setData] = useState<any[]>([]);

  const handleGet = async () => {
    try {
      const response: AxiosResponse<any[]> = await get('https://api.com/data');
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePost = async () => {
    try {
      const data = { name: 'John Doe', email: 'johndoe@example.com' };
      const response: AxiosResponse<any[]> = await post('https://api.com/data', data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={handleGet}>Get Data</button>
      <button onClick={handlePost}>Post Data</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AxiosExample;