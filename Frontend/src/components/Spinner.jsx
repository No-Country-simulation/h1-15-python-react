
const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-magentaButton border-r-transparent border-b-magentaButton border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-r-magentaButton border-b-transparent border-l-magentaButton rounded-full animate-spin-reverse"></div>
      </div>
    </div>
  );
};

export default Spinner;
