import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //   const datePickerStyles = {
  //     gridColumn: "5/10",
  //     gridRow: "2/4",
  //     background: "cornflowerblue",
  //   };

  const inputStyles = {
    // Take up 100% of the container width
    innerWidth: 1000,
    height: 50,
    borderRadius: 10,
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        timeCaption="Time"
        customInput={<input style={inputStyles} />}
      />
    </div>
  );
};

export default DateTimePicker;
