import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      setProducts(await fetchProducts());
    }
    load();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            <img src={p.image} alt={p.name} width={100} /> {p.name} - ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
