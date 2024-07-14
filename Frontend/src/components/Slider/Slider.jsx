import { useState } from "react";
import "./Slider.css";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    // URLs o rutas de las imágenes aquí
    "/Profile.png",
    "/Profile1.png",
    "/Profile2.png",
  ];

  const handlePrev = () => {
    if (activeIndex === 0) {
      setActiveIndex(images.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex === images.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <div className="carousel-container">
      {/* Contenedor para las cards */}
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-card ${
              index === activeIndex ? "active" : "inactive"
            }`}
            style={{
              width: index === activeIndex ? "343px" : "215px",
              height: index === activeIndex ? "250px" : "215px",
            }}
          ></div>
        ))}
      </div>

      {/* Controles de navegación */}
      <div className="carousel-controls">
        <button onClick={handlePrev}>Anterior</button>
        <button onClick={handleNext}>Siguiente</button>
      </div>

      {/* Paginador */}
      <div className="carousel-pagination">
        {images.map((_, index) => (
          <span
            key={index}
            className={`pagination-bullet ${
              index === activeIndex ? "active" : ""
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
