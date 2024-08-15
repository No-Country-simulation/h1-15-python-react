import { useEffect, useState } from "react";

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (!window.botpressWebChat) {
      const script1 = document.createElement("script");
      script1.src = import.meta.env.VITE_BOTPRESS_SCRIPT1;
      script1.async = true;
      document.body.appendChild(script1);

      const script2 = document.createElement("script");
      script2.src = import.meta.env.VITE_BOTPRESS_SCRIPT2;
      script2.defer = true;
      document.body.appendChild(script2);

      script1.onload = () => {
        window.addEventListener("message", handleWebChatMessage);
      };
    } else {
      window.addEventListener("message", handleWebChatMessage);
    }

    return () => {
      window.removeEventListener("message", handleWebChatMessage);
    };
  }, []);

  const handleWebChatMessage = (event) => {
    if (event.data.type === "UI.CLOSED") {
      setIsChatOpen(false);
    } else if (event.data.type === "UI.OPENED") {
      setIsChatOpen(true);
    } else if (
      event.data.type === "UI.SET-CLASS" &&
      event.data.value.includes("bp-widget-hidden")
    ) {
      setIsChatOpen(false);
    }
  };

  const showChat = () => {
    if (window.botpressWebChat) {
      window.botpressWebChat.sendEvent({ type: "show" });
      setIsChatOpen(true);
    }
  };

  return (
    <div className="relative">
      <div id="webchat" className="absolute inset-0" />
      {!isChatOpen && (
        <section className="fixed right-8 bottom-5 z-40 flex flex-col items-end space-y-2">
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
            src="/chatbot.webp"
            alt="Bot Justina"
            className="cursor-pointer w-[80px] md:w-[120px] rounded-full"
            onClick={showChat}
          />
        </section>
      )}
    </div>
  );
};

export default Chatbot;
