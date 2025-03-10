import React, { InputHTMLAttributes, useEffect, useState } from "react";

function CalendarInput(prop: {date: Date, setDate: (date: Date) => void}) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

    const handleDateClick = (day: number) => {
        let inputChecked = document.querySelector<HTMLInputElement>(".edit-block-calendar-checkbox")
        prop.setDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
        inputChecked ? inputChecked.checked = false : console.log("Oh shit");
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);

    return (
        <>
            <div className="edit-form-calendar">
                <div className="edit-form-calendar-header">
                    <button onClick={handlePrevMonth}>◀</button>
                    <h3>{currentDate.toLocaleString("default", { month: "long", year: "numeric" })}</h3>
                    <button onClick={handleNextMonth}>▶</button>
                </div>

                <div className="edit-form-calendar-weekdays">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                        <div key={day} className="edit-form-calendar-weekday">{day}</div>
                    ))}
                </div>

                <div className="edit-form-calendar-days">
                    {Array.from({ length: startDay }).map((_, index) => (
                        <div key={`empty-${index}`} className="edit-form-calendar-empty"></div>
                    ))}

                    {Array.from({ length: totalDays }).map((_, index) => {
                        const day = index + 1;
                        const isSelected = prop.date?.toDateString() === new Date(year, month, day).toDateString();

                        return (
                            <div
                                key={day}
                                className={`"edit-form-calendar-day" ${isSelected ? "edit-form-calendar-selected" : ""}`}
                                onClick={() => handleDateClick(day)}
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default CalendarInput;