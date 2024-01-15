import  { useState } from "react";
import { GoogleMap, Marker, InfoWindow,useJsApiLoader } from "@react-google-maps/api";

const Map = () => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 40.4165000, lng: -3.7025600});
  const [address, setAddress] = useState("");
  const [coordsResult, setCoordsResult] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleSearch = () => {
    if (!map || !address) return;

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results, status) => {
      console.log('results',results)
      if (status === window.google.maps.GeocoderStatus.OK) {
        setCenter(results[0].geometry.location);
        setCoordsResult([results[0].geometry.location]);
      } else {
        console.error("Geocode was not successful for the following reason:", status);
      }
    });
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };
 const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_TOKEN,
  });
  return (
  
      <div>
        <div>
          <input
            type="text"
            placeholder="Ingrese la dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
        {isLoaded && 
        <div className="w-full h-96">
          <GoogleMap
          center={center}
          zoom={8}
          onLoad={onMapLoad}
          mapContainerStyle={{ height: "100%", width:"100%" ,border:0 }}
        >
          {coordsResult.map((coords, i) => (
            <Marker
              key={i}
              position={coords}
              onClick={() => handleMarkerClick(coords)}
            >
              {selectedMarker === coords && (
                <InfoWindow onCloseClick={handleInfoWindowClose} position={coords}>
                  <div>
                    <span>{address}</span>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap></div>}
      
      </div>
   
  );
};

export default Map;
