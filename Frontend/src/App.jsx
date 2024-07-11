import CardAppKey from "./components/Cards/CardAppKeys";
import CardFunction from "./components/Cards/CardFunction";

function App() {
  return (
    <>
      <main className="flex flex-col items-center justify-start w-screen h-[8579px] px-[14px] bg-gradient-background_1">
        <nav className="flex pt-8 pb-16 px-[14px] items-center justify-between w-full">
          <div className="w-[100px] h-[60px] bg-white rounded-md ml-2">
            <img src="/justinaLogo.png" alt="logo" />
          </div>
          <button className="bg-magentaButton w-[104px] h-[34px] font-josefin mr-2 font-bold text-sm text-white rounded-[10px]">
            Iniciar sesión
          </button>
        </nav>
        {/**CTA */}
        <section className="w-full flex relative h-[482px] justify-center items-end">
          <div className="absolute top-0 right-0 w-[315px] h-[358px] border-[10px] border-Justina_7"></div>
          <div className="absolute top-5 left-0 w-[325px] h-[318px] bg-white">
            <h2 className="font-josefin text-magentaButton font-semibold text-[25px] pt-[30px] pl-[18px]">
              UNA APP QUE SALVA VIDAS
            </h2>
            <p className="font-josefin font-normal text-[#6C6C72] pt-[43px] w-[295px] absolute right-2">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>
          <button className="bg-magentaButton w-[195px] h-[63px] font-josefin mr-2 font-bold text-2xl text-white rounded-[10px]">
            Empezá aca
          </button>
        </section>
        {/**MOCKUP */}
        <section className="w-full flex my-16 justify-center">
          <div>
            <img src="/landing1.png" alt="logo" />
          </div>
        </section>
        {/**ABOUT*/}
        <section className="w-full flex flex-col items-center h-[935px] mb-24">
          <h2 className="text-[#232233] font-josefin font-semibold text-2xl mb-4">
            SOBRE NUESTRA APP
          </h2>
          <p className="font-josefin font-normal text-base text-center text-[#6C6C72] pb-10">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequuntur, veniam architecto.
          </p>
          <div>
            <img src="/landing2.png" alt="logo" />
          </div>
          <div className="flex flex-col items-center justify-center gap-5 mt-10">
            <CardAppKey
              title="DISEÑO ACCESIBLE"
              message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <CardAppKey
              title="FACIL DE USAR"
              message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <CardAppKey
              title="LA MEJOR EXPERIENCIA"
              message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </div>
        </section>
        {/**FUNCTIONS */}
        <section className="bg-[url('/fondoLanding.png')] w-[375px] h-[2000px] flex flex-col items-center">
          <h2 className="font-josefin text-2xl text-white font-semibold pt-16">
            FUNCIONES DE LA APP
          </h2>
          <p className="text-center font-josefin text-white text-base px-9 pt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            nunc ante velit vitae.
          </p>
          <CardFunction
            imgSrc="browser.svg"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        </section>
      </main>
    </>
  );
}

export default App;
