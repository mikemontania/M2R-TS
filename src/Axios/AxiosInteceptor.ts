import axios from 'axios';

// Define el interceptor
axios.interceptors.request.use((config) => {
  // obtiene los datos del local storage
  const cadena = localStorage.getItem('globalData');
  const storedGlobal = (cadena !== null) ? JSON.parse(cadena) : null;

  // agrega el header de autorización si hay datos almacenados en el local storage
  if (storedGlobal?.authdata) {
    config.headers.Authorization = `Basic ${storedGlobal.authdata}`;
  }
console.log('interceptado')
  return config;
});