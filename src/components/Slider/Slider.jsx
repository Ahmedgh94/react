import React, { useState, useEffect } from "react";
import "./Slider.css";

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatische slide wissel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000); // elke 4 seconden
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay"></div>
          <div className="slide-content">
            <h2>{slide.title}</h2>
            <p>{slide.text}</p>
          </div>
        </div>
      ))}

      {/* Navigatie bolletjes */}
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
