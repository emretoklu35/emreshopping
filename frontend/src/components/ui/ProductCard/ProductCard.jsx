import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onProductClick }) => {
  if (!product) return null;
  
  function goToProductPage(product){
    window.open(product.redirectUrl, "_blank");
  }

  function handleProductClick(){
    // Add product to last visited products
    // instead save in redux store
    onProductClick(product);

    // Go to product page
    goToProductPage(product);
  }

  return (
    <div className="product-card" onClick={handleProductClick}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <button className="favorite-button">❤️</button>
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">{product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</div>
        {product.rating && (
          <div className="product-rating">
            {Array(5).fill().map((_, i) => (
              <span key={i} className={i < product.rating ? 'star filled' : 'star'}>★</span>
            ))}
          </div>
        )}
        <button className="add-to-cart-button">Sepete Ekle</button>
      </div>
    </div>
  );
};

export default ProductCard; 