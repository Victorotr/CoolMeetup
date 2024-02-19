import React from "react";
import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";
const months = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "set",
  "oct",
  "nov",
  "dic",
];

let now = new Date();
const options = {
	autoHide: true,
	todayBtn: true,
	clearBtn: false,
	clearBtnText: "Clear",
	maxDate: new Date("2099-01-01"),
	minDate: now,
	theme: {
	  background: "bg-white shadow-md border border-zinc-900/10",
	  todayBtn: "",
	  clearBtn: "",
	  icons: "",
	  text: "",
	  disabledText: "",
	  input: "bg-white",
	  inputIcon: "",
	  selected: "",
	  
	},
	icons: {
	  prev: () => (
		<span className="text-sm">{months[now.getMonth() - 1 < 0 ? 11 : now.getMonth() - 1]}</span>
	  ),
	  next: () => (
		<span className="text-sm">{months[now.getMonth() + 1 > 11 ? 0 : now.getMonth() + 1]}</span>
	  ),
	},
	datepickerClassNames: "",
	defaultDate: new Date(),
	language: "es",
	disabledDates: [],
	weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Select Date",
	inputDateFormatProp: {
	  day: "numeric" as "numeric" | "2-digit" | undefined,
	  month: "numeric" as "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined,
	  year: "numeric" as "numeric" | "2-digit" | undefined,
	},
  };
  

const DatePickerComponent = ({ onDateChange,onChange }) => {
  const [show, setShow] = useState(false);
  const handleChange = (selectedDate: Date) => {
    now = new Date(selectedDate);
    if (onDateChange) {
      onDateChange(selectedDate);
    }
	if (onChange) {
		onChange(); // Llama a la función onChange del formulario
	  }
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
	
   
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
		classNames="shadow-md rounded-md"
      />
 
	
  );
};

export default DatePickerComponent;
