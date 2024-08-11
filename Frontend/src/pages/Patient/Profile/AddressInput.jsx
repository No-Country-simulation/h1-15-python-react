/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// URL de la API de Nominatim
const NOMINATIM_URL = import.meta.env.VITE_NOMINATIM_URL;

const AddressInput = ({ onAccept, onClose }) => {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [locationDetected, setLocationDetected] = useState("");
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [mapZoom, setMapZoom] = useState(15);

  const handleChange = useCallback(async (event) => {
    const input = event.target.value;
    setAddress(input);

    if (input.length > 2) {
      try {
        const response = await axios.get(NOMINATIM_URL, {
          params: {
            q: input,
            format: "json",
            limit: 5,
            addressdetails: 1,
          },
        });

        const results = response.data;
        setSuggestions(results.map((result) => result.display_name));
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  }, []);

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);
    setSuggestions([]);

    try {
      const response = await axios.get(NOMINATIM_URL, {
        params: {
          q: selectedAddress,
          format: "json",
          limit: 1,
          addressdetails: 1,
        },
      });

      const results = response.data;
      if (results.length > 0) {
        const { lat, lon } = results[0];
        const newCoords = [parseFloat(lat), parseFloat(lon)];
        setMapCenter(newCoords);
        setMapZoom(15);
        setLocationDetected(selectedAddress);
      }
    } catch (error) {
      console.error("Error fetching coordinates for selected address:", error);
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get(NOMINATIM_URL, {
              params: {
                q: `${latitude},${longitude}`,
                format: "json",
                limit: 1,
                addressdetails: 1,
              },
            });

            const results = response.data;
            if (results.length > 0) {
              const detectedAddress = results[0].display_name;
              setAddress(detectedAddress);
              setLocationDetected(detectedAddress);

              const newCoords = [latitude, longitude];
              setMapCenter(newCoords);
              setMapZoom(15);
            }
          } catch (error) {
            console.error(
              "Error fetching address for detected location:",
              error,
            );
          }
        },
        (error) => {
          console.error("Error detecting location:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (locationDetected) {
      handleSelect(locationDetected);
    }
  }, [locationDetected]);

  // Custom hook to update the map's center
  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  const handleAccept = () => {
    onAccept(address);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-6">
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Dirección:
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={handleChange}
                placeholder="Ingresa tu dirección o click en detectar..."
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={detectLocation}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Detectar Ubicación
            </button>
            {suggestions.length > 0 && (
              <ul className="mt-4 bg-gray-100 border border-gray-300 rounded-md shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(suggestion)}
                    className="p-3 hover:bg-gray-200 cursor-pointer"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            {locationDetected && (
              <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded-md">
                <p className="text-gray-700 font-semibold">Ubicación Detectada:</p>
                <p>{locationDetected}</p>
              </div>
            )}
            <div className="flex justify-end mt-4 p-3">
              <button
                onClick={handleAccept}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Aceptar
              </button>
              <button
                onClick={handleCancel}
                className="ml-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancelar
              </button>
            </div>
          </div>
          <div className="flex-1 p-4">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              className="h-96 rounded-md border border-gray-300"
            >
              <ChangeView center={mapCenter} zoom={mapZoom} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={mapCenter}>
                <Popup>{address}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressInput;
