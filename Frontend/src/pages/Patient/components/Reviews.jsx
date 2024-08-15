/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import Icon from "../../../components/Icon/Icon";
import { submitReview } from "../../../services/reviewService";
import { showToast } from "../../../utils/toast";

const Reviews = ({ doctorId, reviews }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentReviews, setCurrentReviews] = useState(reviews);
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  const handleRating = (rate) => {
    setRating(rate);
    setError("");
  };

  const handleAddReview = () => {
    console.log("Nueva reseña agregada");
    showToast("¡Reseña agregada con éxito!", "success");
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Por favor, selecciona una calificación.");
      return;
    }

    if (review.trim() === "") {
      setError("Por favor, escribe una reseña.");
      return;
    }

    try {
      await submitReview(doctorId, review, rating.toFixed(2));
      setCurrentReviews(currentReviews + 1);
      handleAddReview();
      setModalOpen(false);
      setReview("");
      setRating(0);
    } catch (error) {
      console.error("Error al enviar la reseña:", error.message);
      showToast("Error al enviar la reseña. Inténtalo de nuevo.", "error");
    }
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModalOpen(false);
    }
  };

  useState(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-center items-center">
        <p className="text-center md:text-lg mt-2">Reseñas: {currentReviews}</p>
        <button
          className="text-magentaButton px-4 py-2 rounded-md text-3xl"
          onClick={() => setModalOpen(true)}
        >
          <Icon name="FaCirclePlus" />
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center backdrop-blur-sm backdrop-brightness-75 z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-4/5 md:w-1/3"
          >
            <h2 className="text-center text-xl font-bold mb-4">
              Deja tu reseña
            </h2>

            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-8 h-8 cursor-pointer ${
                    rating >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleRating(star)}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.167a1 1 0 00.95.69h4.384c.969 0 1.371 1.24.588 1.81l-3.561 2.587a1 1 0 00-.364 1.118l1.357 4.167c.3.921-.755 1.688-1.539 1.118L10 15.347l-3.562 2.587c-.783.57-1.838-.197-1.538-1.118l1.357-4.167a1 1 0 00-.364-1.118L2.331 9.594c-.783-.57-.381-1.81.588-1.81h4.384a1 1 0 00.95-.69l1.356-4.167z" />
                </svg>
              ))}
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <textarea
              className="w-full p-2 mb-4 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-magentaButton"
              placeholder="Escribe tu opinión aquí..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>

            <div className="flex justify-end gap-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-magentaButton text-white px-4 py-2 rounded-lg"
              >
                Aceptar
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
