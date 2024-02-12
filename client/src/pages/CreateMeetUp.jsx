import { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { IoMdClose } from "react-icons/io";
import { ImCamera } from "react-icons/im";
import nopicture from "../assets/no_meetup_image.png";
import { MdSearch, MdDelete, MdEmojiEmotions } from "react-icons/md";
import { Handler } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { categories } from "../../categories";
import DatePickerComponent from "../components/DatePicker";
import CustomTimePicker from "../components/CustomTimePicker";
import { formDataInstance } from "../axios/Instance";
import { useRef } from "react";
const Map = () => {
  const addressRef = useRef(null)
  const { user, settoast, accessLoading } = Handler();
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 40.4165, lng: -3.70256 });
  const [address, setAddress] = useState("");
  const [coordsResult, setCoordsResult] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [queryResults, setqueryResults] = useState(null);
  const [selected, setselected] = useState({ isSelected: false });
  const [file, setfile] = useState(null);
  const [DragActive, setDragActive] = useState(false);
  const [meetupTime, setMeetupTime] = useState(null);
  const [meetupDate, setmeetupDate] = useState(null);
  const [emojiOn, setemojiOn] = useState(false);
  const [meetupForm, setmeetupForm] = useState({
    user_id: null,
    title: "",
    description: "",
    category: categories[0],
    meetupDate: null,
    address: null,
  });
  useEffect(() => {
   
    if (!user && !accessLoading ) {
      navigate("/signin");
      settoast({
        on: true,
        type: "warning",
        text: "Accede para poder crear meetups",
      });
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, accessLoading]);
  let emojis =
    `😀😄😁😆😅😂🤣🥲🥹😊😇🙂🙃😉😌😍🥰😘😗😙😚
     😋😛😝😜🤪🤨🧐🤓😎🥸🤩🥳😏😒😞😔😟😕🙁☹️😣
     😖😫😩🥺😢😭😮‍💨😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🫣
     🤗🫡🤔🫢🤭🤫🤥😶😶‍🌫️😐😑😬🫨🫠🙄😯😦😧😮😲🥱
     😴🤤😪😵😵‍💫🫥🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡
     💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽🙀😿😾`;
     
  emojis = [...emojis];
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

  const handleUpButton = (e) => {
    e.preventDefault();
    const type = e.target.files[0].type.slice(-3);

    if (type === "png" || type === "jpg" || type === "gif" || type === "peg") {
      setfile(e.target.files[0]);
      //setfileErr("");
    } else {
      //setfileErr("Not allowed file extention");
    }
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const type = e.dataTransfer.files[0].type.slice(-3);

      if (
        type === "png" ||
        type === "jpg" ||
        type === "gif" ||
        type === "peg"
      ) {
        setfile(e.dataTransfer.files[0]);
        
      } else {
       settoast({on:true,type:'warning',text:'Extensión no permitida'})
      }
    }
  };

  useEffect(() => {
    let meetUpDate = new Date();
    if (!meetupDate) {
      setmeetupForm({ ...meetupForm, meetupDate: meetUpDate });
    } else {
      meetUpDate = new Date(meetupDate);
    }
    if (!meetupTime) {
      meetUpDate.setHours(meetUpDate.getHours() + 2);
    } else {
      meetUpDate.setHours(meetupTime.hours);
      meetUpDate.setMinutes(meetupTime.minutes);
    }

    setmeetupForm({ ...meetupForm, meetupDate: meetUpDate });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetupDate, meetupTime]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    setmeetupForm({ ...meetupForm, user_id: user.id });
    try {
      const now = new Date();
      now.setHours(now.getHours() + 1);

      if (meetupForm.meetupDate < now) {
        settoast({
          on: true,
          type: "warning",
          text: "La fecha del meetup tiene que ser minimo una hora más tarde que el dia y hora actual.",
        });
        return;
      }

      let formData = new FormData();
      if (file) {
        formData.append("avatar", file);
      }

      for (const key in meetupForm) {
        if (key === "address") {
          if(!meetupForm["address"]) {
            console.log(addressRef)
            addressRef.current.scrollIntoView({ behavior: 'smooth' });
            addressRef.current.focus();
       
            settoast({
              on: true,
              type: "warning",
              text: "Falta la ubicación del Meetup!",
            });
            return;
          }
          formData.append("address", JSON.stringify(meetupForm["address"]));
        } else {
          formData.append(key, meetupForm[key]);
        }
      }

      const res = await formDataInstance.post("/create/meetup", formData);

      if (res.status === 200 && res.data) {
        settoast({
          on: true,
          type: "success",
          text: res.data.message,
        });
        navigate("/meetups/details/" + res.data.meetupId);
      }
    } catch (error) {
      console.log(error);
      if (error && error.response.data.message) {
        settoast({
          on: true,
          type: "warning",
          text: error.response.data.message,
        });
      } else {
        settoast({ on: true, type: "warning", text: "Algo ha ido mal" });
      }
    }
  };
  const HandleForm = (e) => {
    setmeetupForm({
      ...meetupForm,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className=" w-full max-w-4xl mx-auto py-10 border rounded-lg sm:px-2">
      <h1 className=" text-xl font-semibold px-3 mx-auto">
        Crear Meetup
      </h1>
      <form
        onSubmit={HandleSubmit}
        className=" flex flex-col  items-start justify-start gap-3 py-5 px-2"
      >
        <label htmlFor="title" className="font-semibold px-1">
          Titulo MeetUp
        </label>
        <input
          type="text"
          name="title"
          onChange={HandleForm}
          className="mx-1 px-2 w-full rounded-md shadow-sm  flex items-center font-normal  relative border border-zinc-900/10 justify-between py-2"
          placeholder="Como se va a llamar el meetup?"
          value={meetupForm.title}
          required
        />
        <div className="relative w-full justify-center">
          <label htmlFor="title" className="font-semibold px-1">
            Descripción
          </label>
          <textarea
            required
            name="description"
            rows={5}
            cols={10}
            onChange={HandleForm}
            className="resize-none shadow-sm mx-1 px-2 w-full rounded-md  flex items-center font-normal relative border border-zinc-900/20 justify-between py-2"
            placeholder="De que se trata?"
            value={meetupForm.description}
          />
          <div
            className={`${
              emojiOn ? "h-full" : "h-0 "
            } transition-all absolute bottom-6 max-h-48 overflow-y-scroll left-0 mx-1 z-50 px-3  w-full text-xl flex flex-wrap gap-2 bg-white`}
          >
            {emojis.map((item, index) => (
              <span
                className="hover:bg-zinc-900/10"
                onClick={() => {
                  setmeetupForm({
                    ...meetupForm,
                    description: meetupForm.description + item,
                  });
                  setemojiOn(false);
                }}
                key={index}
              >
                {item}
              </span>
            ))}
          </div>
          <span className="absolute flex item-center justify-between px-3 bottom-1 w-full font-medium text-xs">
            <span onClick={() => setemojiOn(!emojiOn)}>
              <MdEmojiEmotions className="text-zinc-900/70" size={20} />
            </span>
            {meetupForm.description.length || 0}/500
          </span>
        </div>

        <label htmlFor="categoria" className="font-semibold px-1">
          Categoría
        </label>
        <select
          onChange={HandleForm}
          name="category"
          className="p-3 shadow-md bg-zinc-50/20 border-2 border-blue-500 font-semibold rounded-md"
        >
          {categories.map((item, i) => {
            return <option key={i}>{item}</option>;
          })}
        </select>
        <div>
          <label htmlFor="date" className="font-semibold px-1">
            Cuando?
          </label>
          <div className="flex  gap-2 font-semibold text-sm">
            <DatePickerComponent
              onDateChange={(date) => {
                setmeetupDate(date);
              }}
            />

            <CustomTimePicker timeSelected={(time) => setMeetupTime(time)} />
          </div>
        </div>
        <div className="flex flex-col  w-full my-5 relative">
          <div
            className={`w-full  relative flex flex-col justify-center items-center `}
          >
            <div
            className="border w-full"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <img
                className={`${
                  DragActive && "border-2 border-indigo-500"
                } ${!file ? 'object-contain':'object-cover'} transition-all w-full h-72   border-zinc-900/20 m-1`}
                src={file ? URL.createObjectURL(file) : nopicture}
                alt="User picture"
              />
            </div>
            <div className=" flex flex-col gap-3 my-5 text-sm w-full">
              <label
                htmlFor="file-upload"
                className="flex items-center transition-all justify-center gap-1 hover:outline outline-indigo-500/80  border-2 border-indigo-500 p-1 py-2 px-3 rounded-full font-semibold text-zinc-900/80"
              >
                <span>
                  <ImCamera />
                </span>
                Subir foto del meetup
                <input
                  id="file-upload"
                  name="file-upload"
                  onChange={handleUpButton}
                  type="file"
                  className="sr-only"
                />
              </label>

              <button
                onClick={(e) =>{e.preventDefault();setfile(null)}}
                className={`${
                  !file && "hidden"
                } flex items-center justify-center gap-1 py-2 px-3  border border-zinc-50 bg-red-500 outline outline-1 hover:outline-2 outline-red-600 transition-all rounded-full font-semibold text-zinc-50`}
              >
                <MdDelete size={20} />
                Eliminar
              </button>
            </div>
          </div>
        </div>

        <label htmlFor="direction" className="font-semibold px-1">
          Donde?
        </label>
        <div
       
        className=" w-full rounded-md shadow-md flex items-center font-normal  relative border border-zinc-900/10 justify-between ">
          <input
            type="text"
            name="direction"
            placeholder="Busca una dirección"
             ref={addressRef} 
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            value={address}
            disabled={selected.isSelected}
            className="focus:border-4  focus:border-blue-500 rounded-md w-full h-full py-1.5 px-3 disabled:bg-transparent placeholder:text-zinc-900/60 focus:outline-none bg-transparent"
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex items-center px-2">
            <span
              onClick={handleSearch}
              disabled={address.length < 5}
              className={`${
                selected.isSelected && "hidden"
              }  hover:scale-110 transition-all flex items-center border px-2 py-1 mt-1 rounded-lg bg-blue-500 text-white`}
            >
              <MdSearch className="text-white" size={25} /> Buscar
            </span>
            <span
              onClick={() => {
                setqueryResults(null);
                setCoordsResult([]);
                setAddress("");
                setselected({ isSelected: false });
                setmeetupForm({ ...meetupForm, address: null });
              }}
              className={`${
                !address.length && "hidden"
              } hover:scale-110 transition-all`}
            >
              <IoMdClose className="text-zinc-900/70" size={30} />
            </span>
          </div>
          <div
            className={`${
              queryResults ? "block" : "hidden"
            } w-full bg-zinc-50 absolute top-12 left-0 z-40 `}
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
                      setmeetupForm({ ...meetupForm, address: item });
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
          <div className="w-full h-[350px]">
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
        <button
       
          className="border w-full p-3 font-semibold text-zinc-50 bg-blue-500 rounded-md disabled:brightness-75"
          type="submit"
        >
          Publicar meetup!
        </button>
      </form>
    </section>
  );
};

export default Map;
