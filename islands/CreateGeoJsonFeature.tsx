import { useState } from "preact/hooks";
import CoordinatesInput from "./CoordinateInput.tsx";

export default function CreateGeoJsonFeature({ mapboxAccessToken }) {
  const [type, setType] = useState("Feature");
  const [geometryType, setGeometryType] = useState("Point");
  const [coordinates, setCoordinates] = useState([125.6, 10.1]);
  const [name, setName] = useState("Dinagat Islands");

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleGeometryTypeChange = (event) => {
    setGeometryType(event.target.value);
  };

  const handleCoordinatesChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Placeholder fetch post request
    fetch("/api/geojson/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        geometryType,
        coordinates,
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-gray-100"
      >
        <div class="grid grid-cols-2 gap-8 w-full h-full">
          <div className="flex flex-col space-y-4">
            <div>
              <label for="type" class="block text-gray-700 font-bold mb-2">
                Type:
              </label>
              <input
                type="text"
                id="type"
                value={type}
                onChange={handleTypeChange}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                for="geometry-type"
                class="block text-gray-700 font-bold mb-2"
              >
                Geometry Type:
              </label>
              <input
                type="text"
                id="geometry-type"
                name="geometry-type"
                value={geometryType}
                onChange={handleGeometryTypeChange}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                for="coordinates"
                class="block text-gray-700 font-bold mb-2"
              >
                Coordinates:
              </label>
              <input
                type="text"
                id="coordinates"
                name="coordinates"
                value={`${coordinates[0]}, ${coordinates[1]}`}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label for="name" class="block text-gray-700 font-bold mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="flex items-center justify-between">
              <input
                type="submit"
                value="Submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <CoordinatesInput
            onCoordinatesChange={handleCoordinatesChange}
            mapboxAccessToken={mapboxAccessToken}
          />
        </div>
      </form>
    </>
  );
}
