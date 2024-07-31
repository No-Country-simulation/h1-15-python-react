import { useState, useEffect } from "react";
import Modal from "./Modal";

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
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative flex items-center space-x-2">
      <button
        onClick={() => {
          if (isListening) {
            stopListening();
          } else {
            startListening();
          }
        }}
        className={`p-3 rounded-full flex items-center justify-center transition-colors duration-300 ${
          isListening
            ? "bg-red-500 hover:bg-red-700 text-white"
            : "bg-blue-500 hover:bg-blue-700 text-white"
        }`}
        style={{ width: "60px", height: "60px" }}
      >
        <p>Dictar</p>
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
