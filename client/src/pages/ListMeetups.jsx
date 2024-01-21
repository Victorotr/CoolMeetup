import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import DatePickerComponent from "../components/DatePicker";
import axios from "axios";
import { Handler } from "../context/Context";
import { useState } from "react";
import moment from "moment";

const ListMeetups = () => {
  const [meetupsList, setMeetupsList] = useState([]);
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
  const {settoast} = Handler();
  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form_values = Object.fromEntries(formData);
    //llamada al endpoint de listar meetups
    axios.post(import.meta.env.VITE_API_URL+'/getMeetups',
      {
        date: form_values.date,
        tematica: form_values.tematica,
        provincia: form_values.provincia
      },
      {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'origin':'x-requested-with',
        'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
        'Content-Type': 'application/json',
      },
    }).then(function(response){
      settoast({on:true,type:'warning',text:'Meetups listados con éxito'});
      console.log(response.data.data);
      setMeetupsList(response.data.data);
      console.log(meetupsList);
    }).catch(function (error){
      settoast({on:true,type:'error',text:error.response.data.message});
    })
};

  
  return (
    <div className="">
      <h1>meetups map</h1>
      <div className="w-full h-96 border">
        {isLoaded && (
          <GoogleMap
            onClick={(e) => console.log(e.latLng.lat(), e.latLng.lng())}
            mapContainerStyle={{ height: "100%", width: "100%" }}
            zoom={10}
            center={center}
          >
            <Marker position={center}></Marker>
            <Marker position={newCenter}></Marker>
          </GoogleMap>
          
        )}

        <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
          <div className="mx-1 px-2 rounded-md my-10 flex items-center font-medium bg-zinc-50 relative border border-zinc-900/10 justify-center gap-10 py-3">
              <p>Fecha del evento</p>
              <DatePickerComponent></DatePickerComponent>
              <p>Temática</p>
              <select name="tematica" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Senderismo</option>
              </select>
              <p>Provincia</p>
              <select name="provincia" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Sevilla</option>  
              </select>
              <button type="submit" className="bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-red-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                Aplicar Filtro
              </button>
          </div>
        </form>
        <div className="meetupsBoard">
          {meetupsList?.map((e) => {
            return(
              <div className="meetupCard p-4 max-w-sm">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="rounded-t-lg" src={import.meta.env.VITE_API_URL+'/getImage/'+e.meetup_image+'/Meetup'} alt="" />
                    </a>
                    <div class="p-5">
                      <p>{moment(e.meetup_datetime).format('DD/MM/YYYY')} - {moment(e.meetup_time, 'HH:mm:ss').format('HH:mm')}</p>
                        <a href="#">
                            <h4 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{e.meetup_title}</h4>
                        </a>
                        <p className="resume-text mb-3 font-normal text-gray-700 dark:text-gray-400">{e.meetup_description}</p>
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Más detalles
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            )
          }
          )}
        </div>
      </div>
    


    </div>
  );
};

export default ListMeetups;
