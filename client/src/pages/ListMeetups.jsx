import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const ListMeetups = () => {
  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  const newCenter = {
    lat: -4.745,
    lng: -39.523,
  };
  // const [map, setmap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_TOKEN,
  });
  return (
    <div className="">
      <h1>meetups map</h1>
      {isLoaded && (
        <GoogleMap
          onClick={(e) => console.log(e.latLng.lat(), e.latLng.lng())}
          mapContainerStyle={{ height: "100vh", width: "100%" }}
          zoom={10}
          center={center}
          
        >
          
          <Marker 
        
          position={center}></Marker>
          <Marker position={newCenter}></Marker>

        </GoogleMap>
      )}
    </div>
  );
};

export default ListMeetups;
