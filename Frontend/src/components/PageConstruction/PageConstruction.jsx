import BackButton from "../BackButton/BackButton";

const PageConstruction = () => {
  return (
    <section className="h-screen flex flex-col justify-between py-6 px-4">
      <div>
        <BackButton />
      </div>
      <div className="flex flex-grow justify-center items-center">
        <img
          src="/constrution.webp"
          alt="Página en construcción"
          className="max-w-full h-auto"
        />
      </div>
    </section>
  );
};

export default PageConstruction;
