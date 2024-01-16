import {useState} from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { IoMdClose } from "react-icons/io";
import { MdSearch } from "react-icons/md";

const Map = () => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 40.4165, lng: -3.70256 });
  const [address, setAddress] = useState("");
  const [coordsResult, setCoordsResult] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [queryResults, setqueryResults] = useState(null);
  const [selected, setselected] = useState({ isSelected: false });

  

  const onMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };
  const handleCoords = (coords) => {
    setCoordsResult([coords]);
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

  const handleSearch = () => {
    if (!map || !address || selected.isSelected) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        setqueryResults(results);
      } else {
        setqueryResults(null);
      }
    });
  };
  return (
    <section className="w-full max-w-4xl mx-auto py-10">
      <h1 className="font-Lora text-xl px-2">Crear Meetup</h1>
      <div className="mx-1 px-2 rounded-md my-10 flex items-center font-medium bg-zinc-50 relative border border-zinc-900/10 justify-between py-3">
        <input
          type="text"
          placeholder="Busca una dirección"
          onKeyDown={(e)=>{if(e.key === 'Enter'){handleSearch()}}}
          value={address}
          disabled={selected.isSelected}
          className="w-full h-full py-3 px-2 placeholder:text-zinc-900/60 focus:outline-none bg-transparent"
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="flex items-center">
          <span onClick={handleSearch} 
          className={`${selected.isSelected && 'hidden'}  hover:scale-110 transition-all`}
         >
            <MdSearch  className="text-zinc-900/70" size={25} />
          </span>
          <span
            onClick={() => {
              setqueryResults(null);
              setCoordsResult([]);
              setAddress("");
              setselected({ isSelected: false });
            }}
            className={`${!address.length && 'hidden'} hover:scale-110 transition-all`}
          >
            <IoMdClose 

            className="text-zinc-900/70" size={30} />
          </span>
        </div>
        <div
          className={`${
            queryResults ? "block" : "hidden"
          } w-full bg-zinc-50 absolute top-16 left-0 z-40 `}
        >
          <ul className={`${queryResults ? "block" : "hidden"}`}>
            {queryResults &&
              queryResults.map((item) => (
                <li
                  onClick={() => {
                    setqueryResults(null);
                    handleCoords(item.geometry.location);
                    setCenter(item.geometry.location);
                    setAddress(item.formatted_address);
                    setselected({ isSelected: true });
                  }}
                  key={item.place_id}
                  className="border p-3 py-4 hover:bg-blue-500/20 transition-all hover:cursor-pointer"
                >
                  {item.formatted_address}
                </li>
              ))}
          </ul>
        </div>
      </div>
      {isLoaded && (
        <div className="w-full h-[500px]">
          <GoogleMap
            center={center}
            zoom={coordsResult.length ? 15 : 5}
            options={{ disableDefaultUI: true }}
            onLoad={onMapLoad}
            mapContainerStyle={{ height: "100%", width: "100%", border: 0 }}
          >
            {coordsResult.map((coords, i) => (
              <Marker
                key={i}
                position={coords}
                onClick={() => {
                  handleMarkerClick(coords);
                }}
              >
                {selectedMarker === coords && (
                  <InfoWindow
                    onCloseClick={handleInfoWindowClose}
                    position={coords}
                  >
                    <div className="p-2">
                      <span>{address}</span>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </GoogleMap>
        </div>
      )}
    </section>
  );
};

export default Map;
