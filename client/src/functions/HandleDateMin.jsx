

const HandleDateMin = (date) => {
  const DateIn = new Date(date);


  const monthsNames = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const month = DateIn.getMonth();
 
  const day = DateIn.getDate() < 10 ? "0" + DateIn.getDate() : DateIn.getDate();
  const hours =
    DateIn.getHours() < 10 ? "0" + DateIn.getHours() : DateIn.getHours();
  const minutes =
    DateIn.getMinutes() < 10 ? "0" + DateIn.getMinutes() : DateIn.getMinutes();

  return (
    <span className="flex items-center justify-start gap-[2px] font-medium ">
    {day} {monthsNames[month]} {hours}:{minutes}
    </span>
  );
};

export default HandleDateMin;
