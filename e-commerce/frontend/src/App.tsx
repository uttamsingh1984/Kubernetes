import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '0 auto', maxWidth: 1024, padding: 24 }}>
      <header style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1>E-Commerce Microservices</h1>
        <p>React storefront with .NET Catalog and Orders APIs behind Kubernetes.</p>
      </header>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16 }}>
              <img src={product.imageUrl || 'https://via.placeholder.com/320x180'} alt={product.name} style={{ width: '100%', borderRadius: 8, objectFit: 'cover', minHeight: 180 }} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p style={{ fontWeight: 700 }}>${product.price.toFixed(2)}</p>
              <p>Stock: {product.stock}</p>
              <button style={{ padding: '10px 14px', borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>
                Add to cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
