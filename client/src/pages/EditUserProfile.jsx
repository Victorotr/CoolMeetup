import { useState, useEffect } from "react";
import { Handler } from "../context/Context";
import { CiSaveDown2 } from "react-icons/ci";
import nouser from "../assets/no_picture.png";
import { ImCamera } from "react-icons/im";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const EditUserProfile = () => {
  const navigate = useNavigate();
  const { user,settoast,accessLoading} = Handler();
  const [userData, setuserData] = useState({
    bio:'',
  });
  const [DragActive, setDragActive] = useState(false);
  const [file, setfile] = useState(null);
  useEffect(() => {
   if(!user && !accessLoading){
    navigate('/signin');
    settoast({on:true,type:'warning',text:'Accede para ver la info de usuarios'})
   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  
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
        // setfileErr("");
      } else {
        // setfileErr("Not allowed file extention");
        
      }
    }
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

  const getUserInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  const getUser = async () => {
    try {
      if (!user && !accessLoading) {
        return;
      }
  setuserData(user);

    } catch (error) {
      console.log(error);
      settoast({on:true,type:'warning',text:'Hubo un problema al obtener los datos de usuario'})
    }
  };
  useEffect(() => {
    getUser();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const HandleChange = (e) => {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
 
  };
  const HandleSubmit = async ()=>{

    let formData = new FormData();
   
    if(file){
     formData.append('avatar',file);
    }
    
    for (const key in userData) {
      formData.append(key, userData[key]);
    }
    
    const res = await getUserInstance.post('/update/user',formData, {headers: {
      'Content-Type': 'multipart/form-data',
    }});
    console.log(res);
    if(res && res.status === 200){
    navigate(`/user/details/${user.id}`)
    }

  }
  return (
    <main>
      <section className="mx-auto w-full max-w-2xl py-10 ">
        <div className="flex flex-col px-5 relative">
          <div className={` relative flex items-center `}>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <img
                className={`${DragActive && 'border-2 border-indigo-500'} transition-all w-24 h-24 sm:w-28 sm:h-28 over rounded-full object-cover border-2 border-zinc-900/20 m-1`}
                src={
                  file
                    ? URL.createObjectURL(file)
                    : userData?.avatar
                    ? userData?.avatar
                    : nouser
                }
                alt="User picture"
              />
            </div>
            <div className=" flex flex-col gap-3 text-sm ml-16">
              <label
                htmlFor="file-upload"
                className="flex items-center transition-all justify-start gap-1 hover:outline outline-indigo-500/80  border-2 border-indigo-500 p-1 px-1.5 rounded-full font-semibold text-zinc-900/80"
              >
                <span>
                  <ImCamera />
                </span>
                Subir foto de perfíl
                <input
                  id="file-upload"
                  name="file-upload"
                  onChange={handleUpButton}
                  type="file"
                  className="sr-only"
                />
              </label>
              
              <button 
              onClick={()=>setfile(null)}
              className={`${!file && 'hidden'} flex items-center  gap-1  border border-zinc-50 bg-red-500 outline outline-1 hover:outline-2 outline-red-600 transition-all p-1 px-1.5 rounded-full font-semibold text-zinc-50`}>
                <MdDelete size={20} />
                Eliminar
              </button>
            </div>
          </div>

          <div className="mx-3 flex flex-col gap-2">
            <h1 className="text-xl font-medium mt-5 ">{userData?.username}</h1>
       
            <div className="flex flex-col relative">
              <label className="font-semibold text-md my-1" htmlFor="bio">
                Sobre mí
              </label>
              <textarea
                placeholder={user?.bio || "Algo sobre ti"}
                maxLength={500}
                name="bio"
                onChange={HandleChange}
                value={userData?.bio || ''}
                className="text-zinc-900/80 font-medium  p-2 bg-transparent resize-none border border-zinc-900/10 outline-none focus:outline-blue-600/40 rounded-md"
                id="bio"
                cols="30"
                rows="9"
              ></textarea>
              <span className="absolute bottom-1 right-3 font-medium text-xs">
                {userData?.bio?.length || 0}/500
              </span>
            </div>
            <div>
              <button 
              onClick={HandleSubmit}
              className="w-full border px-2.5 py-2.5 flex bg-blue-500 text-zinc-50 items-center justify-center gap-2 rounded-lg">
                <span>
                  <CiSaveDown2 size={20} />
                </span>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditUserProfile;
