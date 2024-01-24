import React from "react";
import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";
const months = ['ene','feb','mar','abr','may','jun','jul','ago','set','oct','nov','dic',]
let now = new Date()
const options = {

	autoHide: true,
	todayBtn: false,
	clearBtn: false,
	clearBtnText: "Clear",
	maxDate: new Date("2099-01-01"),
	minDate: new Date("2024-01-01"),
	theme: {
		background: "bg-white",
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
		// () => ReactElement | JSX.Element
		prev: () => <span>{months[now.getMonth() -1 < 0 ? 11 : now.getMonth() -1]}</span>,
		next: () => <span>{months[now.getMonth() +1 > 11 ? 0 : now.getMonth() +1 ]}</span>,
	},
	datepickerClassNames: "top-12",
	defaultDate: new Date(),
	language: "es",
	disabledDates: [],
	weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Select Date",
	inputDateFormatProp: {
		day: "numeric",
		month: "numeric",
		year: "numeric"
	}
}

const DatePickerComponent = () => {
	const [show, setShow] = useState(false)
	const handleChange = (selectedDate: Date) => {
		
		now = new Date(selectedDate)
	}
	const handleClose = (state: boolean) => {
		setShow(state)
	}

	return (
		<div className="flex items-center justify-center ">
		<Datepicker  options={options} onChange={handleChange} show={show} setShow={handleClose} />
		</div>
	)
}

export default DatePickerComponent;