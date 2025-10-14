import axios from 'axios';

export const fetchProducts = async () => {
  const res = await axios.get('http://localhost:5000/api/products');
  return res.data;
};
