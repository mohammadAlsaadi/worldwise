import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

import Button from "./Button";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([41.3809, 2.1228]);
  const [mapLat, mapLng] = useUrlPosition();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (mapLat && mapLng !== null) {
        setMapPosition([mapLat, mapLng]);
      }
    },

    [mapLat, mapLng]
  );
  useEffect(
    function () {
      if (geolocationPosition) {
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      }
    },
    [geolocationPosition]
  );
  // console.log(mapLat);
  // const position = mapLat !== null ? [mapLat, mapLng] : mapPosition;
  // console.log(position);
  // console.log(mapPosition);

  //onClick={() => navigate("form")}
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading ..." : "Use Your Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={11}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {city.cityName}. <br />{" "}
              {city.notes === "" ? "no tips yet !" : city.notes}.
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
        <Marker position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      console.log(e.latlng);
    },
  });
}

export default Map;
