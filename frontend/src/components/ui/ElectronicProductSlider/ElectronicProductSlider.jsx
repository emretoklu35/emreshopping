import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ElectronicProductSlider.css';

const ElectronicProductSlider = ({ electronics, electronicsLoading, onProductClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: false,
    focusOnSelect: true,
  };

  return(
    <section className="section electronics-section">
      {electronicsLoading ? (
        <div className="loading">Ürünler yükleniyor...</div>
      ) : (
        <div className="carousel-container">
          <SlickSlider {...settings}>
            {electronics?.map((product) => (
              <div className="product-item" key={product.id}>
                <ProductCard product={product} onProductClick={onProductClick} />
              </div>
            ))}
          </SlickSlider>
        </div>
      )}
    </section>
  )
};

export default ElectronicProductSlider;