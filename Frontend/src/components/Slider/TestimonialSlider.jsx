/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import "./docstyles.css"

const TestimonialSlider = ({ testimonials }) => {
  return (
    <div className="w-full max-w-screen-md p-10 pb-20">
      <Swiper
        modules={[Navigation, Pagination, A11y, EffectCards]}
        spaceBetween={20}
        effect="cards"
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true, el: ".swiper-pagination" }}
        slidesPerView={1} // Esto es importante para el efecto de cartas
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="swiper-container"
      >
        {testimonials.cards.map((testimonial, index) => (
          <SwiperSlide
            key={index}
            className="bg-white rounded-lg shadow-inner px-4 py-10"
          >
            <div className="flex flex-col items-center justify-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 md:w-28 md:h-28 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg md:text-3xl font-bold text-center mt-5">
                  {testimonial.name}
                </h3>
                <p className="text-base md:text-xl font-semibold mt-2 text-[#6c6c72]">
                  {testimonial.condition}
                </p>
              </div>
              <p className="mt-4 text-center">{testimonial.comment}</p>
            </div>
          </SwiperSlide>
        ))}

        {/* Personalizar los dots de paginación */}
        <div className="swiper-pagination !bottom-[-30px] flex justify-center items-center"></div>

        {/* Personalizar las flechas de navegación */}
        <div className="swiper-button-next !text-transparent !w-12 !h-12 !right-2"></div>
        <div className="swiper-button-prev !text-transparent !w-12 !h-12 !left-2"></div>
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
