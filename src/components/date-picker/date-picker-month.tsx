import { ReactNode } from "react";
import { MonthProps } from "../../types/date-picker.types";
import { getNumberOfRows } from "../../utils/date-picker.utils";
import { Days } from "./date-picker-days";

const daylabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DayLabel = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-14 h-8 flex items-center justify-center text-xs font-medium">
      {children}
    </div>
  );
};

export const Month = ({
  year,
  month,
  bookedDays,
  handleClick,
  dateRange,
}: MonthProps) => {
  const firstDateOfMonth = new Date(year, month - 1, 1);
  const numOfDays = new Date(year, month, 0).getDate();
  const dayOfWeek = firstDateOfMonth.getDay();
  const monthName = firstDateOfMonth.toLocaleString("default", {
    month: "long",
  });
  const numberOfRows = getNumberOfRows(numOfDays, dayOfWeek);

  return (
    <div className="min-w-[21rem]">
      <h4 className="month text-center font-bold">
        {monthName.substring(0, 3)} {year}
      </h4>
      <div className="grid grid-cols-7 text-gray-500 text-center border-b">
        {daylabels.map((label, i) => (
          <DayLabel key={i}>{label}</DayLabel>
        ))}
      </div>
      <div className="calendar">
        {Array.from(Array(6).keys()).map((daysRow, i) => {
          if (i < 4)
            return (
              <Days
                key={i}
                month={month}
                year={year}
                handleClick={handleClick}
                dayOfWeek={dayOfWeek}
                numberOfDaysInMonth={numOfDays}
                rowNumber={i}
                dateRange={dateRange}
                bookedDays={bookedDays}
              />
            );
          if (numberOfRows >= 5 && i === 4)
            return (
              <Days
                key={i}
                month={month}
                year={year}
                handleClick={handleClick}
                dayOfWeek={dayOfWeek}
                numberOfDaysInMonth={numOfDays}
                rowNumber={i}
                dateRange={dateRange}
                bookedDays={bookedDays}
              />
            );
          if (numberOfRows === 6 && i === 5)
            return (
              <Days
                key={i}
                month={month}
                year={year}
                handleClick={handleClick}
                dayOfWeek={dayOfWeek}
                numberOfDaysInMonth={numOfDays}
                rowNumber={i}
                dateRange={dateRange}
                bookedDays={bookedDays}
              />
            );
          return null;
        })}
      </div>
    </div>
  );
};
