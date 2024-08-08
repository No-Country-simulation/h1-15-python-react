import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const ChatBot = () => {
  const [isPressed, setIsPressed] = useState(false);

  const showChat = () => {
    setIsPressed(true);
  };

  const hideChat = () => {
    setIsPressed(false);
  };

  const chatBotUrl = import.meta.env.VITE_CHATBOT_URL;

  return (
    <div>
      {isPressed ? (
        <div className="fixed right-5 bottom-16 z-40 font-josefin">
          <div className="bg-[#ffffff] flex items-center h-[48px] rounded-tl-md rounded-tr-md">
            <div className="pl-4 flex items-center gap-6">
              <span className="text-base font-medium text-[#333333]">
                BIENVENIDO A JUSTINA.IO
              </span>
            </div>
            <div className="pr-4 ml-auto">
              <IoMdClose
                className="text-lg text-[#0007] cursor-pointer"
                onClick={hideChat}
              />
            </div>
          </div>

          <div className="relative w-[482px] h-[400px] overflow-hidden">
            <iframe
              src={chatBotUrl}
              title="ChatBot"
              className="w-full h-full border-0"
              allow="microphone; geolocation; camera"
            ></iframe>
          </div>
        </div>
      ) : (
        <section className="fixed right-5 bottom-5 z-40 flex flex-col items-end space-y-2">
          <div className="relative flex items-center justify-end w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse_delay_200"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse_delay_400"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse_delay_200"></div>
              </div>
            </div>
          </div>
          <img
            src="/chatbot.png"
            alt="Robot amarillo"
            className="cursor-pointer w-[120px] rounded-full"
            onClick={showChat}
          />
        </section>
      )}
    </div>
  );
};

export default ChatBot;
