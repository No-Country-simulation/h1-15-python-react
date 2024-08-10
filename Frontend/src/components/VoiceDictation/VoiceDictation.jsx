import { useState, useEffect } from "react";
import Modal from "./Modal";
import Icon from "../Icon/Icon";

// eslint-disable-next-line react/prop-types
const VoiceDictation = ({ onDictate }) => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Tu navegador no soporta la API de reconocimiento de voz.");
      return;
    }

    const recognitionInstance = new window.webkitSpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;

    recognitionInstance.onresult = (event) => {
      let newTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        newTranscript += event.results[i][0].transcript;
      }
      setTranscript(newTranscript);
    };

    recognitionInstance.onerror = (event) => {
      console.error("Error de reconocimiento:", event.error);
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
      setIsModalOpen(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleConfirm = () => {
    onDictate(transcript);
    setTranscript("");
    setIsModalOpen(false);
    stopListening();
  };

  const handleClose = () => {
    setTranscript("");
    setIsModalOpen(false);
    stopListening();
  };

  return (
    <div className="absolute flex items-center bottom-2 right-1">
      <button
        type="button"
        onClick={() => {
          if (isListening) {
            stopListening();
          } else {
            startListening();
          }
        }}
        className={`flex items-center justify-center transition-all duration-300 rounded-r-xl ${
          isListening ? "animate-blink" : ""
        }`}
        style={{ width: "40px", height: "40px" }}
      >
        <Icon name="voice" />
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        transcript={transcript}
      />
    </div>
  );
};

export default VoiceDictation;
