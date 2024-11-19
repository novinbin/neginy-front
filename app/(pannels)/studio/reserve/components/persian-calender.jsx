import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment-jalaali";

const PersianCalendar = () => {
  const [date, setDate] = useState();

  const handleDateChange = (selectedDate) => {
    const jalaliDate = moment(selectedDate).format("jYYYY/jM/jD");
    setDate(jalaliDate);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>
        {date ? date : "انتخاب تاریخ"}
      </button>
      <Calendar mode="single" selected={date} onSelect={handleDateChange} />
    </div>
  );
};

export default PersianCalendar;
