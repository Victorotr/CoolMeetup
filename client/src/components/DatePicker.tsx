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
const minDate = new Date();
let now = new Date();
const options = {
	autoHide: true,
	todayBtn: false,
	clearBtn: false,
	clearBtnText: "Clear",
	maxDate: new Date("2099-01-01"),
	minDate: new Date("2024-01-01"),
	theme: {
	  background: "",
	  todayBtn: "",
	  clearBtn: "",
	  icons: "",
	  text: "",
	  disabledText: "",
	  input: "",
	  inputIcon: "",
	  selected: "",
	},
	icons: {
	  prev: () => (
		<span>{months[now.getMonth() - 1 < 0 ? 11 : now.getMonth() - 1]}</span>
	  ),
	  next: () => (
		<span>{months[now.getMonth() + 1 > 11 ? 0 : now.getMonth() + 1]}</span>
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
  

const DatePickerComponent = ({ onDateChange }) => {
  const [show, setShow] = useState(false);
  const handleChange = (selectedDate: Date) => {
    now = new Date(selectedDate);
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div className="bg-slate-50/10">
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      />
    </div>
  );
};

export default DatePickerComponent;
