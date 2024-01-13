"use client";
import { useEffect, useState } from "react";

export default function Calendar() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(null);

	// Weekdays
	const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	//! CURRENT MONTH

	const createMonthArray = (length, startDate = 1) => {
		let currentMonthDays = [];
		for (let i = 0; i < length; i++) {
			currentMonthDays.push(i + startDate);
		}
		return currentMonthDays;
	};

	const getLengthOfMonth = (year, month) =>
		new Date(year, month + 1, 0).getDate();

	const currentMonthLength = getLengthOfMonth(
		currentDate.getFullYear(),
		currentDate.getMonth()
	);

	const getFirstDayofMonth = (year, month) =>
		(new Date(year, month, 1).getDay() + 6) % 7;

	const currentMonthDays = createMonthArray(currentMonthLength);

	const firstDayOfMonth = getFirstDayofMonth(
		currentDate.getFullYear(),
		currentDate.getMonth()
	);
	//! PREVIOUS MONTH

	const prevMonthLength = getLengthOfMonth(
		currentDate.getFullYear(),
		currentDate.getMonth() - 1
	);
	const prevMonthDays = createMonthArray(
		firstDayOfMonth,
		prevMonthLength - firstDayOfMonth + 1
	);

	// ! NEXT MONTH
	const totalCells = 42; // 7cols * 6 rows
	const nextMonthLength =
		totalCells - (currentMonthLength + prevMonthDays.length);
	const nextMonthDays = createMonthArray(nextMonthLength);
	console.log(nextMonthLength);

	// Change month on arrows
	const changeMonth = (direction) => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + direction)
		);
	};

	//! Noticed this small bug after recording video so i correcteed with simple nullification of date on month change
	useEffect(() => {
		setSelectedDate(null);
	}, [currentDate]);
	return (
		<div className="flex flex-col p-5 gap-5">
			<header className="flex justify-between items-center">
				<button onClick={() => changeMonth(-1)}>{"<"}</button>
				<span className="font-extrabold">
					{currentDate.toLocaleDateString("en-US", {
						month: "long",
						year: "numeric",
					})}
				</span>
				<button onClick={() => changeMonth(1)}>{">"}</button>
			</header>
			<section className="grid grid-cols-7 gap-2 ">
				{weekDays.map((weekDay) => (
					<span key={weekDay} className="text-green-500 font-bold ">
						{weekDay}
					</span>
				))}
				{prevMonthDays.map((day) => (
					<div key={`prev-${day}`} className="text-gray-300 mx-auto p-2 px-5">
						{day}
					</div>
				))}
				{currentMonthDays.map((day) => (
					<span
						key={day}
						onClick={() => setSelectedDate(day)}
						className={`rounded-xl mx-auto p-2 px-5 ${
							selectedDate === day
								? "bg-green-500 text-white"
								: "hover:bg-green-100"
						}`}
					>
						{day}
					</span>
				))}
				{nextMonthDays.map((day) => (
					<div key={`next-${day}`} className="text-gray-300 mx-auto p-2 px-5">
						{" "}
						{day}
					</div>
				))}
			</section>
		</div>
	);
}
