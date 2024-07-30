// import Swiper styles
import "swiper/css";
import "./Slider.css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

export default function Carousel({ testimonials }) {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="swiper-bullet ' + className + '">' + "</span>";
    },
  };

  return (
    <>
      <Swiper
        effect={"cards"}
        spaceBetween={30}
        grabCursor={true}
        pagination={pagination}
        modules={[Pagination, EffectCards]}
        className="mySwiper"
      >
        {testimonials.cards.map((swiper, index) => (
          <SwiperSlide className="flex flex-col items-center" key={index}>
            <img className="w-12 h-12 rounded-full" src={swiper.image} alt={swiper.name} />
            <h2 className="text-[25px] font-semibold font-josefin text-[#232233]">
              {swiper.name}
            </h2>
            <h3 className="text-base font-josefin text-[#232233] pb-4">
              {swiper.condition}
            </h3>
            <p className="px-2 text-base text-center text-[#6C6C72]">
              {swiper.comment}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
