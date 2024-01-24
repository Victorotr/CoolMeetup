import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import DatePickerComponent from "../components/DatePicker";
import axios from "axios";
import { Handler } from "../context/Context";
import { useState, useEffect } from "react";
import MeetupCard from "../Cards/meetupCard";
const ListMeetups = () => {
  const [meetupsList, setMeetupsList] = useState([]);
  const [center, setcenter] = useState({ lat: 40.4165, lng: -3.70256 });
  const [zoom, setzoom] = useState(5.5);
  const [themeList, setthemeList] = useState([]);
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
        console.log(res.data.data);
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
    if (meetupsList && meetupsList.length) {
      console.log(meetupsList);
      const themes = meetupsList.map((item) => {
        return item.meetup_theme;
      });
      const EliminateDuplicates = [...new Set(themes)];
      
      setthemeList(EliminateDuplicates);
      const firstMeet = meetupsList[0];
      setcenter({
        lat: parseFloat(firstMeet.x_cordinate),
        lng: parseFloat(firstMeet.y_cordinate),
      });
      setzoom(10);
    }
  }, [meetupsList]);

  return (
    <div className="">
      <h1 className="text-2xl font-semibold my-5 mx-3 font-Lora ">
        Mapa Meetups
      </h1>
      <div className="w-full h-96 border max-w-4xl mx-auto">
        {isLoaded && (
          <GoogleMap
            onClick={(e) => console.log(e.latLng.lat(), e.latLng.lng())}
            mapContainerStyle={{ height: "100%", width: "100%" }}
            zoom={zoom}
            center={center}
          >
            {meetupsList?.map((item) => (
              <Marker
                key={item.id_meetup}
                position={{
                  lat: parseFloat(item.x_cordinate),
                  lng: parseFloat(item.y_cordinate),
                }}
              ></Marker>
            ))}
          </GoogleMap>
        )}

        <form
          className="mt-2 p-3 rounded-md dark:text-white"
          onSubmit={submitForm}
        >
          <div className="py-3  flex-wrap flex items-start font-medium bg-zinc-50 relative  justify-center gap-2 ">
            <div className="flex flex-col max-w-[140px]">
              <p className="text-center">Fecha del evento</p>
              <DatePickerComponent />
            </div>
            <div className="flex flex-col">
              <p className="text-center">Temática</p>
              <select
                name="tematica"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Sevilla</option>
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
        <div className="border flex flex-wrap justify-center items-start gap-3 p-1 py-3">
          {meetupsList?.map((item) => {
            return <MeetupCard key={item.meetup} meetup={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ListMeetups;
