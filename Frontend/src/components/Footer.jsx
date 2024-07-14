import CardContacto from "./Cards/CardContacto";

const Footer = () => {
  return (
    <div className="bg-[#232233] w-[375px] h-[1010px] flex flex-col items-center gap-3 px-4 justify-self-end mt-[140px]">
      <CardContacto />
      <img src="logo.svg" alt="logo" />
      <p className="w-[313px] text-center text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc
        ante velit vitae. Est tellus vitae, nullam lobortis enim.
      </p>
      <div className="flex justify-between w-[282px] mt-[29px]">
        {/**FACEBOOK */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_120_3526)">
            <path
              d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"
              fill="#FFFFFF"
            />
          </g>
          <defs>
            <clipPath id="clip0_120_3526">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className="border-l-2 border-[#6C6C72] w-1 h-[23px]"></div>
        {/**INSTAGRAM */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#FFFFFF"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_120_3529)">
            <path
              d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z"
              fill="#FFFFFF"
            />
          </g>
          <defs>
            <clipPath id="clip0_120_3529">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className="border-l-2 border-[#6C6C72] w-1 h-[23px]"></div>
        {/**TWITTER */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_120_3532)">
            <path
              d="M22.162 5.65593C21.3986 5.99362 20.589 6.2154 19.76 6.31393C20.6337 5.79136 21.2877 4.96894 21.6 3.99993C20.78 4.48793 19.881 4.82993 18.944 5.01493C18.3146 4.34151 17.4804 3.89489 16.5709 3.74451C15.6615 3.59413 14.7279 3.74842 13.9153 4.18338C13.1026 4.61834 12.4564 5.30961 12.0771 6.14972C11.6978 6.98983 11.6067 7.93171 11.818 8.82893C10.1551 8.74558 8.52832 8.31345 7.04328 7.56059C5.55823 6.80773 4.24812 5.75097 3.19799 4.45893C2.82628 5.09738 2.63095 5.82315 2.63199 6.56193C2.63199 8.01193 3.36999 9.29293 4.49199 10.0429C3.828 10.022 3.17862 9.84271 2.59799 9.51993V9.57193C2.59819 10.5376 2.93236 11.4735 3.54384 12.221C4.15532 12.9684 5.00647 13.4814 5.95299 13.6729C5.33661 13.84 4.6903 13.8646 4.06299 13.7449C4.32986 14.5762 4.85 15.3031 5.55058 15.824C6.25117 16.3449 7.09712 16.6337 7.96999 16.6499C7.10247 17.3313 6.10917 17.8349 5.04687 18.1321C3.98458 18.4293 2.87412 18.5142 1.77899 18.3819C3.69069 19.6114 5.91609 20.264 8.18899 20.2619C15.882 20.2619 20.089 13.8889 20.089 8.36193C20.089 8.18193 20.084 7.99993 20.076 7.82193C20.8949 7.23009 21.6016 6.49695 22.163 5.65693L22.162 5.65593Z"
              fill="#FFFFFF"
            />
          </g>
          <defs>
            <clipPath id="clip0_120_3532">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className="border-l-2 border-[#6C6C72] w-1 h-[23px]"></div>
        {/**YOUTUBE */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_120_3535)">
            <path
              d="M21.543 6.498C22 8.28 22 12 22 12C22 12 22 15.72 21.543 17.502C21.289 18.487 20.546 19.262 19.605 19.524C17.896 20 12 20 12 20C12 20 6.107 20 4.395 19.524C3.45 19.258 2.708 18.484 2.457 17.502C2 15.72 2 12 2 12C2 12 2 8.28 2.457 6.498C2.711 5.513 3.454 4.738 4.395 4.476C6.107 4 12 4 12 4C12 4 17.896 4 19.605 4.476C20.55 4.742 21.292 5.516 21.543 6.498ZM10 15.5L16 12L10 8.5V15.5Z"
              fill="#FFFFFF"
            />
          </g>
          <defs>
            <clipPath id="clip0_120_3535">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      {/**LINKS */}
      <div className="flex flex-col items-center text-white font-josefin pt-16 gap-3">
        <h3 className="text-[25px] font-semibold">LINKS</h3>
        <ul className="flex flex-col gap-3 items-center">
          <li>Sobre Nosotros</li>
          <li>Funcionalidades</li>
          <li>Testimonios</li>
          <li>Blog</li>
        </ul>
      </div>
      {/**NEWWLETTER */}
      <div className="font-josefin text-white mt-16">
        <h3 className="text-[25px] font-semibold">NEWSLETTER</h3>
        <p className="text-white pb-2">
          Suscríbete a nuestro boletín para recibir nuestras últimas novedades.
          noticias actualizadas
        </p>
        <div className="relative">
          <input
            className="w-full h-[50px] pl-4 py-3 rounded"
            placeholder="Tu dirección de email"
          />
          <button className="w-[48px] h-[46px] bg-magentaButton grid items-center justify-center rounded absolute right-[1px] top-[2px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_120_3680)">
                <path
                  d="M3.60699 12.9996H9.18423V10.9996H3.60699V1.84562C3.60701 1.75873 3.62807 1.67335 3.6681 1.59789C3.70813 1.52242 3.76574 1.45949 3.83527 1.41527C3.90479 1.37106 3.98383 1.34711 4.06458 1.34576C4.14534 1.34442 4.22502 1.36574 4.29578 1.40762L21.4569 11.5616C21.5298 11.6048 21.5906 11.6682 21.6329 11.7452C21.6752 11.8223 21.6975 11.9101 21.6975 11.9996C21.6975 12.0891 21.6752 12.177 21.6329 12.254C21.5906 12.331 21.5298 12.3945 21.4569 12.4376L4.29578 22.5916C4.22502 22.6335 4.14534 22.6548 4.06458 22.6535C3.98383 22.6521 3.90479 22.6282 3.83527 22.584C3.76574 22.5398 3.70813 22.4768 3.6681 22.4013C3.62807 22.3259 3.60701 22.2405 3.60699 22.1536V12.9996Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_120_3680">
                  <rect
                    width="22.3089"
                    height="24"
                    fill="white"
                    transform="translate(0.818359)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div className="border-t-2 border-white w-full mt-16"></div>
        <div className="font-josefin flex justify-between w-[290px] mx-auto my-4">
          <img src="/icons/copyrightLine.png" alt="copyright" />
          <p className="text-xs font-light">
            Copyright 2024 .h1-15. Derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
