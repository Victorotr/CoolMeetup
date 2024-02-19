
import { useEffect, useState } from "react";
import nouser from "../assets/no_picture.png";
import { Handler } from "../context/Context";
import { ImCamera } from "react-icons/im";
import { FaGear } from "react-icons/fa6";
import { useNavigate ,useParams} from "react-router-dom";
import MeetupCardMin from "../Cards/MeetupCardMin";
import { Instance } from "../axios/Instance";
const UserProfile = () => {
  const { setuser, user, settoast,accessLoading } = Handler();
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setuserData] = useState(null);
  const [userMeetups, setUserMeetups] = useState(null);
  const [userMeetupsAttendees, setUserMeetupsAttendees] = useState(null);

  useEffect(() => {
    if (!user && !accessLoading) {
      navigate("/signin");
      settoast({
        on: true,
        type: "warning",
        text: "Accede para ver la info de usuarios",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user,accessLoading]);
  const getUser = async () => {
   
    try {
      const res = await Instance.get(`/user/details/${id}`);
      if (res.status === 200 && res.data.user) {
        setuserData(res.data.user);
        if (res.data.user.id === user.id) {

          setuser(res.data.user);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMeetupsUser = async () => {
    if (!user && !accessLoading) {
      navigate("/signin");
      settoast({
        on: true,
        type: "warning",
        text: "Accede para ver la info de usuarios",
      });
    }
    try {
      const res = await Instance.get(`/user/meetups/${id}`);
      if (res.status === 200 && res.data.data) {
        setUserMeetups(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getMeetupsAttendeesUser = async () => {
    if (!user && !accessLoading) {
      navigate("/signin");
      settoast({
        on: true,
        type: "warning",
        text: "Accede para ver la info de usuarios",
      });
    }
    try {
      const res = await Instance.get(`/user/meetupsAttendees/${id}`);
      if (res.status === 200 && res.data.data){
        setUserMeetupsAttendees(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
    getMeetupsUser();
    getMeetupsAttendeesUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <section className="mx-auto w-full max-w-6xl pt-5 flex flex-col">
      <section className=" py-5 border rounded-lg shadow-md ">
        <div className="flex  px-3 relative">
          <div className="relative w-32 max-w-32">
            <img
              className="w-24 h-24 min-w-24 min-h-24 sm:w-28 sm:h-28 sm:min-w-28 sm:min-h-28 rounded-full object-cover border-2 border-zinc-900/20 m-1"
              src={userData?.avatar ? userData?.avatar : nouser}
              alt="User picture"
            />
            <div
              onClick={() => navigate("/edit/user/details")}
              className={`${
                userData?.id != user?.id && "hidden"
              } absolute top-14 right-[0px] sm:top-[70px] sm:right-[0px] border-2 border-zinc-900/40 bg-zinc-50 p-1 flex items-center justify-center rounded-full`}
            >
              <ImCamera className="text-zinc-900/80" />
            </div>
          </div>
          <div className="mx-3 flex flex-col gap-2">
            <h1 className="text-xl font-semibold mt-1 ">{userData?.username}</h1>
            <div className="">
              <p>{userData?.bio ? userData.bio : 'esta historia es un secreto por ahora..'}</p>
            </div>
            <div className={`${userData?.id != user?.id && "hidden"}`}>
              <button
                disabled={userData?.id != user?.id}
                onClick={() => navigate("/edit/user/details")}
                className="border px-5 sm:px-20 py-1 flex items-center gap-2 text-zinc-900/80 rounded-lg"
              >
                <span>
                  <FaGear />
                </span>
                Editar perfil
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full  ">
      <div className="w-full mx-auto">  
        <h2 className="text-2xl text-shadow font-semibold my-5 mx-3  ">
          Mis Meetups
        </h2>
        <div className="no-scrollbar shadow-inner  sm:px-3 rounded-lg border border-zinc-900/5  flex flex-wrap justify-start items-start gap-4 p-1 py-3 max-h-[500px] overflow-y-scroll">
          {userMeetups?.length ? (
            userMeetups?.map((item) => {
              return <MeetupCardMin key={item.id_meetup} meetup={item} />;
            })
          ) : (
            <div className="my-10 px-3 text-lg  text-center font-medium">
           Todavía no has creado ningun Meetup
            </div>
          )}
        </div>
          <div className="w-full mx-auto">  
            <h2 className="text-2xl text-shadow font-semibold my-5 mx-3  ">
              Meetups a los que estoy inscrito
            </h2>
            <div className="no-scrollbar sm:px-3 shadow-inner rounded-lg border border-blue-600/20 flex flex-wrap justify-start items-start gap-4 p-1 py-3 max-h-[500px] overflow-y-scroll">
            {userMeetupsAttendees?.length ? (
              userMeetupsAttendees?.map((item) => {
                return <MeetupCardMin key={item.id_meetup} meetup={item} />;
              })
            ) : (
              <div className="my-10 px-3 text-lg  text-center font-medium">
                 Todavia no te has apuntado a ningun Meetup
              </div>
            )}
          </div>
        </div>
      </div>
      </section>

    </section>
  );
};

export default UserProfile;
