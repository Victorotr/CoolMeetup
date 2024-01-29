import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import DatePickerComponent from "../components/DatePicker";
import axios from "axios";
import { Handler } from "../context/Context";
import { useState, useEffect } from "react";
import MeetupCard from "../Cards/meetupCard";
import nopicture from "../assets/no_meetup_image.png";

const ListMeetups = () => {
  const [meetupsList, setMeetupsList] = useState([]);
  const [allMeetups, setAllMeetups] = useState([]);
  const [center, setcenter] = useState({ lat: 40.4165, lng: -3.70256 });
  const [zoom, setzoom] = useState(5.5);
  const [themeList, setthemeList] = useState([]);
  const [pronviceList, setProvinceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // const [map, setmap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_TOKEN,
  });
  const { settoast } = Handler();
  const submitForm = async (e) => {
    e.preventDefault();
   
    const formData = new FormData(e.target);
    const form_values = Object.fromEntries(formData);
    //llamada al endpoint de listar meetups
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/getMeetups",
        {
          date: form_values.date,
          tematica: form_values.tematica,
          provincia: form_values.provincia,
        }
      );
      if (res && res.status === 200) {
        settoast({
          on: true,
          type: "success",
          text: "Meetups listados con éxito",
        });
        setMeetupsList(res.data.data);
        
      
      }
    } catch (error) {
      settoast({
        on: true,
        type: "error",
        text: error.response.data.message,
      });
    }
  };
  useEffect(() => {
    //cargar lista completa de meetups próximos a celebrarse al dia de hoy
    const getMeets = async () => {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/getMeetups",
        {
          date: new Date()
            .toISOString()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/"),
          tematica: "Todas",
          provincia: "Todas",
        }
      );
      if (res && res.status === 200) {
        setAllMeetups(res.data.data);
        setMeetupsList(res.data.data);
      }
     
    };
    getMeets();
  }, []);

  useEffect(() => {
    if (allMeetups && allMeetups.length || meetupsList && meetupsList.length) {
   
      const themes = allMeetups.map((item) => {
        return item.meetup_theme;
      });
      const provinces = allMeetups.map((item) => {
        return item.meetup_town;
      });

      const EliminateDuplicates = [...new Set(themes)];
      const provinceEliminateDuplicates = [...new Set(provinces)];
    

      setthemeList(EliminateDuplicates);
      setProvinceList(provinceEliminateDuplicates);

      const firstMeet =meetupsList[0]|| allMeetups[0];
      setcenter({
        lat: parseFloat(firstMeet.x_cordinate),
        lng: parseFloat(firstMeet.y_cordinate),
      });
      setzoom(10);
    }
  }, [allMeetups, meetupsList]);
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  
  };
  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };
  return (
    <div className="">
      <h1 className="text-2xl font-semibold my-5 mx-3 font-Lora ">
        Mapa Meetups
      </h1>
      <div className="w-full h-72 border max-w-4xl mx-auto">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            zoom={zoom}
            center={center}
          >
            {meetupsList?.map((item) => (
              <Marker
                key={item.id_meetup}
                onClick={() => {
                  handleMarkerClick({
                    lat: item.x_cordinate,
                    lng: item.y_cordinate,
                  });
                }}
                position={{
                  lat: item.x_cordinate,
                  lng: item.y_cordinate,
                }}
              >
                {selectedMarker?.lat === item.x_cordinate &&
                  selectedMarker.lng === item.y_cordinate && (
                    <InfoWindow
                      position={{
                        lat: parseFloat(item.x_cordinate),
                        lng: parseFloat(item.y_cordinate),
                      }}
                      onCloseClick={handleInfoWindowClose}
                    >
                      <div className="p-1 flex flex-col justify-center gap-2 max-w-xs ">
                      <img 
                      className='w-[200px] h-20 object-cover'
                      src={item.meetup_image || nopicture} alt="marker image" />
                      
                      <div className="max-w-[200px]">
                        <p className="font-medium">{item.meetup_title}</p>
                       <p className="">{item.meetup_description}</p></div> 
                       <button 
                       className="border w-full rounded-md bg-blue-500 h-10 text-zinc-50 font-medium shadow-md">Detalles</button>
                      </div>
                    </InfoWindow>
                  )}
              </Marker>
            ))}
          </GoogleMap>
        )}

        <form
          className="mt-2 p-3 rounded-md dark:text-white"
          onSubmit={submitForm}
        >
          <div className="py-3  flex-wrap flex items-start font-medium bg-zinc-50 relative  justify-center gap-2 ">
            <div className="flex flex-col max-w-[140px]">
              <p className="text-center">Eventos desde...</p>
              <DatePickerComponent />
            </div>
            <div className="flex flex-col">
              <p className="text-center">Temática</p>
              <select
                name="tematica"
                className="bg-gray-50 border shadow-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option className="w-full h-10">Todas</option>
                {themeList &&
                  themeList.map((item) => {
                    return (
                      <option key={item} className="w-full h-10">
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex flex-col">
              <p className="text-center">Provincia</p>
              <select
                name="provincia"
                className="bg-gray-50 shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Todas</option>
                {pronviceList &&
                  pronviceList.map((item) => {
                    return (
                      <option key={item} className="w-full h-10">
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mx-auto w-full max-w-sm bg-blue-500 text-zinc-50  border border-blue-300  text-sm font-semibold rounded-lg focus:ring-blue-500  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            Aplicar Filtro
          </button>
        </form>
        <div className=" flex flex-wrap justify-center items-start gap-4 p-1 py-3">
          {meetupsList.length ? (
            meetupsList?.map((item) => {
              return <MeetupCard key={item.id_meetup} meetup={item} />;
            })
          ) : (
            <div className="my-10 px-5 text-lg font-Lora text-center font-medium">
              No se han encontrado meetups! <br /> Crea uno o cambia los
              filtros.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListMeetups;
