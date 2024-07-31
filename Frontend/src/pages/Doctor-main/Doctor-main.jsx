import { useEffect, useState } from "react";
import Navegacion from "./Navigation";
import Calendar from "../../components/Calendar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import LateralView from "../../components/LateralView";

const DoctorMain = () => {
  const [articulos, setArticulos] = useState();
  async function loadNames() {
    const response = await fetch('/src/pages/Doctor-main/News.json');
    const names = await response.json();
    console.log(names.articles);
    setArticulos(names.articles); 
  }
  useEffect(() => {
  loadNames()
  }, []);

  return (
    <main className="flex w-full min-h-[1024px] p-5 gap-5">
      {/**MENU DE NAVEGACION */}
      <div className="min-w-[264px] h-screen"><Navegacion /></div>
      {/**CONTENIDO PRINCIPAL */}
      <section className="max-w-[689px] grid grid-cols-2 gap-2 h-fit">
        <article className="border border-blue-500 rounded-2xl shadow-blue-500 shadow-md">
          {/**calendario */}
          <Calendar />
        </article>
        <article className="border border-blue-500 rounded-2xl shadow-blue-500 shadow-md ">
          {/**Novedades */}
        </article>
        <article className="border border-blue-500 rounded-2xl text-center p-3 shadow-blue-500 shadow-md">
          {/**Estadísticas */}
          <h2 className="text-lg font-bold font-josefin mb-3">Noticias</h2>
          {articulos && (
            <Swiper
              navigation
              autoplay={
                { delay: 5000 }
              }
              scrollbar={{ draggable: true }}
              slidesPerView={1}
              modules={[Navigation, Autoplay]}
            >
              {articulos.map((article) => (
                <SwiperSlide
                  key={article.title}
                  className="bg-white w-full h-full flex flex-col items-start cursor-pointer"
                >
                  <a href={article.url} target="_blank">
                    <img
                      src={article.urlToImage}
                      alt=""
                      className="w-full self-start"
                    />
                    <p>{article.title}</p>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </article>
        <article className="border border-blue-500 rounded-2xl text-center p-3 shadow-blue-500 shadow-md">
          {/**Turnos del día */}
          <h2 className="text-lg font-bold font-josefin mb-3">
            Listas de Espera
          </h2>
          <h4 className="my-2 py-2 cursor-pointer hover:bg-orange-400 hover:text-white bg-orange-300 text-lg font-semibold rounded-lg border border-orange-600 hover:border-2 transition-colors duration-300">
            Andrea busca un ❤️
          </h4>
          <h4 className="my-2 py-2 cursor-pointer hover:bg-orange-400 hover:text-white bg-orange-300 text-lg font-semibold rounded-lg border border-orange-600 hover:border-2 transition-colors duration-300">
            Julián busca un 🫁
          </h4>
          <h4 className="my-2 py-2 cursor-pointer hover:bg-orange-400 hover:text-white bg-orange-300 text-lg font-semibold rounded-lg border border-orange-600 hover:border-2 transition-colors duration-300">
            María busca un 👁️
          </h4>
          <h4 className="my-2 py-2 cursor-pointer hover:bg-orange-400 hover:text-white bg-orange-300 text-lg font-semibold rounded-lg border border-orange-600 hover:border-2 transition-colors duration-300">
            Carlos busca un 🧠
          </h4>
        </article>
      </section>
      {/**CONTENIDO LATERAL */}
      <LateralView />
    </main>
  );
};

export default DoctorMain;
