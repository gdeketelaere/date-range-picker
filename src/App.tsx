import { useState } from "react";
import "./style/App.css";
import DatePicker from "./components/date-picker/date-picker";
import { datePicked } from "./types/date-picker.types";
import { totalDays } from "./utils/date-picker.utils";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

export default function App() {
  const [dateRange, setDateRange] = useState<datePicked[] | undefined>();
  const bookedDays = [
    { startDate: new Date("2022-11-7"), endDate: new Date("2022-11-12") },
    { startDate: new Date("2022-12-19"), endDate: new Date("2022-12-26") },
  ];
  return (
    <div>
      <h1 className="font-bold flex justify-center items-center text-2xl gap-4 my-12">
        Simple Calendar Date Picker <CalendarDaysIcon className="w-8 h-8" />
      </h1>
      <DatePicker setDateRange={setDateRange} bookedDays={bookedDays} />
      <p className="mt-16 w-full text-center">
        {dateRange &&
          dateRange[0]?.toDateString() + " / " + dateRange[1]?.toDateString()}
        {}
      </p>
      <p className="w-full text-center">
        {dateRange && totalDays(dateRange[0], dateRange[1])} days
      </p>
    </div>
  );
}
