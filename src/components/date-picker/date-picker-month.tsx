import { MonthProps } from "../../types/date-picker.types";
import { getNumberOfRows } from "../../utils/date-picker.utils";
import { Days } from "./date-picker-days";

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
    <div className="min-w-[32rem]">
      <h4 className="month text-center font-bold">
        {monthName} {year}
      </h4>
      <div className="grid grid-cols-7 text-gray-500 text-center border-b">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="calendar">
        {Array.from(Array(5).keys()).map((daysRow, i) => {
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
