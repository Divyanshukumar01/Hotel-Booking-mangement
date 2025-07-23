import axios from 'axios';

const api = axios.create({ baseURL: 'https://hotel-booking-mangement-10.onrender.com/api' });

export default api;