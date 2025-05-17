import React, { useState, useEffect } from 'react';
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';
import useFetch from '../../../hooks/useFetch';
import sliderService from '../../../services/sliderService';

const Slider = () => {
  const { data: slides, loading, error } = useFetch(sliderService.getAllSlides, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };

  if (loading) return <div className="slider-skeleton"></div>;
  if (error) return <div className="slider-error">Slider verileri yüklenemedi.</div>;
  if (!slides || slides.length === 0) return null;

  return (
    <div className="slider-container">
      <SlickSlider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide-item">
            <img src={slide.image} alt={slide.title} />
            <div className="slide-info">
              <h3>{slide.title}</h3>
            </div>
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default Slider; 