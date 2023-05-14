import { useEffect, useRef, useState } from "preact/hooks";
import mapboxgl from "https://esm.sh/mapbox-gl?target=es2022";

interface CoordinatesInputProps {
  onCoordinatesChange: (coordinates: [number, number]) => void;
}

mapboxgl.accessToken =
  "pk.eyJ1IjoicmllZmVyMDIiLCJhIjoiY2w5MjF3YXV6MWVibjN1azRlaDY0eGIxeiJ9.FR2Ywzpvn2FnKX0S1tLlRg";

export default function CoordinatesInput(props: CoordinatesInputProps) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    const handleClick = (e) => {
      const { lngLat } = e;
      const coordinates = [lngLat.lng, lngLat.lat];
      console.log(coordinates);
      props.onCoordinatesChange(coordinates);
    };

    map.current.on("click", handleClick);

    return () => {
      map.current.off("click", handleClick);
    };
  }, [props]);

  return (
    <div class="relative py-4">
      <div class="absolute top-4 left-2">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} class="h-80 shadow" />
    </div>
  );
}
