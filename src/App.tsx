import { useState } from "react";
import "./style/App.css";
import DatePicker from "./components/date-picker/date-picker";
import { datePicked } from "./types/date-picker.types";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { totalDays } from "./utils/date-picker.utils";

export default function App() {
  const [dateRange, setDateRange] = useState<datePicked[] | undefined>();
  const totalNights = dateRange ? totalDays(dateRange[0], dateRange[1]) : 0;
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

      <div className="mt-16 w-full text-center">
        <h2 className="text-xl font-bold mb-2">
          {totalNights} night{totalNights > 1 && <>s</>}
        </h2>
        {dateRange && (
          <div className="flex gap-6 justify-center">
            <input
              type="text"
              className="py-2 px-4 border rounded-md text-gray-600"
              value={dateRange[0]?.toDateString()}
            />
            <input
              type="text"
              className="py-2 px-4 border rounded-md text-gray-600"
              value={dateRange[1]?.toDateString()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
