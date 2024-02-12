import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import DatePickerComponent from "../components/DatePicker";
import { Instance } from "../axios/Instance";
import { Handler } from "../context/Context";
import { useState, useEffect } from "react";
import MeetupCard from "../Cards/MeetupCard";
import nopicture from "../assets/no_meetup_image.png";
import { useNavigate } from "react-router-dom";
const ListMeetups = () => {
  const [meetupsList, setMeetupsList] = useState([]);
  const [allMeetups, setAllMeetups] = useState([]);
  const [center, setcenter] = useState({ lat: 40.4165, lng: -3.70256 });
  const [zoom, setzoom] = useState(5.5);
  const [themeList, setthemeList] = useState([]);
  const [pronviceList, setProvinceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [queryParams, setQueryParams] = useState({});

  const navigate = useNavigate();
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
      setisLoading(true);
      const res = await Instance.post("/getMeetups", {
        date: form_values.date,
        tematica: form_values.tematica,
        provincia: form_values.provincia,
        order: form_values.order,
      });

      if (res && res.status === 200) {
        settoast({
          on: true,
          type: "success",
          text: `${res.data?.data.length}  ${
            res.data?.data.length === 1
              ? "Meetup encontrado"
              : "Meetups encontrados"
          }`,
        });
        setMeetupsList(res.data.data);
      }
      setisLoading(false);
    } catch (error) {
      settoast({
        on: true,
        type: "error",
        text: error.response.data.message,
      });
    }
  };
  useEffect(() => {
    const getMeets = async () => {
      const res = await Instance.post("/getMeetups", {
        date: new Date(),
        tematica: "Todas",
        provincia: "Todas",
      });
      if (res && res.status === 200) {
        setAllMeetups(res.data.data);
        setMeetupsList(res.data.data);
      }
    };
    getMeets();
    const currentUrl = window.location.href;
    const searchParams = new URLSearchParams(currentUrl);
    const paramsObject = {};
    for (const [key, value] of searchParams.entries()) {
      paramsObject[key] = value;
    }
    console.log(paramsObject);
    setQueryParams(paramsObject);
  
  }, []);

  useEffect(() => {
    if (
      (allMeetups && allMeetups.length) ||
      (meetupsList && meetupsList.length)
    ) {
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

      const firstMeet = meetupsList[0] || allMeetups[0];
      setcenter({
        lat: firstMeet.x_cordinate,
        lng: firstMeet.y_cordinate,
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
    <div className=" max-w-6xl mx-auto">
      <div>
        <div className="w-full h-72  mx-auto">
          <h1 className="text-2xl font-semibold my-5 mx-3  ">Mapa Meetups</h1>
          <div className="h-72">
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={{ height: "100%", width: "100%" }}
                zoom={zoom}
                center={center}
                options={{ controlSize: 25 }}
              >
                {/* {userLocation &&  
                 <Marker
                    position={{
                      lat: parseFloat(userLocation?.latitude),
                      lng: parseFloat(userLocation?.longitude),
                    }}
                    icon={{url:'/src/assets/custom-marker.png'}}
                  />
                  } */}
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
                            lat: item.x_cordinate,
                            lng: item.y_cordinate,
                          }}
                          onCloseClick={handleInfoWindowClose}
                        >
                          <div className="p-1 flex flex-col justify-center gap-2 max-w-xs ">
                            <img
                              className="w-[200px] h-20 object-cover"
                              src={item.meetup_image || nopicture}
                              alt="marker image"
                            />

                            <div className="max-w-[200px]">
                              <p className="font-medium">{item.meetup_title}</p>
                              <p className="">{item.meetup_description}</p>
                            </div>
                            <button
                              onClick={() =>
                                navigate("/meetups/details/" + item.id_meetup)
                              }
                              className="border w-full rounded-md bg-blue-500 h-10 text-zinc-50 font-medium shadow-md"
                            >
                              Detalles
                            </button>
                          </div>
                        </InfoWindow>
                      )}
                  </Marker>
                ))}
              </GoogleMap>
            )}
          </div>
        </div>
        <form
          className="mt-10 p-3  mx-auto rounded-md dark:text-white "
          onSubmit={submitForm}
        >
          <div className="py-3 flex-wrap flex items-start font-medium  relative  justify-between gap-2  mx-auto">
            <div className="flex flex-col max-w-[120px] ">
              <p className="text-left">Eventos desde</p>
              <DatePickerComponent />
            </div>
            <div className="flex flex-col">
              <p className="text-left">Temática</p>
              <select
                name="tematica"
                defaultValue={queryParams.tematica || "TODAS"}
                className="custom-select bg-slate-50/10 border shadow-md border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                <option className="w-full h-10 bg-red">Todas</option>
                {themeList &&
                  themeList.map((item) => {
                    return (
                      <option value={item} key={item} className="w-full h-10">
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="flex flex-col">
              <p className="text-left">Ciudad</p>
              <select
                name="provincia"
                className="bg-slate-50/10 shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <div className="flex flex-col">
              <p className="text-left">Ordenar por</p>
              <select
                name="order"
                className="bg-slate-50/10 border shadow-md border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                <option className="w-full h-10">Fecha</option>
                <option className="w-full h-10">Asistentes</option>
              </select>
            </div>
            {/* <div className="flex flex-col h-14 justify-between items-center">
              <p className="text-left">Ocultar cancelados</p>
              <input type="checkbox" checked  className="w-5 h-5" />
            
            </div> */}
          </div>
          <button
            type="submit"
            className="mx-auto flex justify-center items-center gap-2 h-10  w-full  bg-blue-500 text-zinc-50  border border-blue-300  text-sm font-semibold rounded-lg focus:ring-blue-500  hover:border-blue-600/70 hover:bg-blue-400 transition-all"
          >
            <span>{isLoading ? "Filtrando" : "Filtrar"}</span>{" "}
            {isLoading && <div className="lds-dual-ring" />}
          </button>
        </form>
        <div className=" flex flex-wrap justify-center items-start gap-4 p-1 py-3 max-w-6xl mx-auto max-h-[900px] no-scrollbar overflow-y-scroll">
          {meetupsList?.length ? (
            meetupsList?.map((item) => {
              return (
                <div
                  className="max-w-md sm:max-w-[350px] sm:min-w-[350px] w-full"
                  key={item.id_meetup}
                  onClick={(e) => {
                    setcenter({ lat: item.x_cordinate, lng: item.y_cordinate });
                    
                    e.stopPropagation();
                  }}
                >
                  <MeetupCard mapcenter={center} meetup={item} />
                </div>
              );
            })
          ) : (
            <div className="my-10 px-5 text-lg  text-center font-medium">
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
