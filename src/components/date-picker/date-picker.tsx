import { useEffect, useState } from "react";
import {
  datePicked,
  DatePickerProps,
  handleClick,
} from "../../types/date-picker.types";
import { checkBookedRangeDays, roundDown } from "../../utils/date-picker.utils";
import { Month } from "./date-picker-month";

const today = new Date();

const DatePicker = ({ setDateRange, bookedDays }: DatePickerProps) => {
  const [startDate, startDateSet] = useState<datePicked>(undefined);
  const [endDate, endDateSet] = useState<datePicked>(undefined);
  useEffect(() => {
    setDateRange([startDate, endDate]);
  }, [setDateRange, startDate, endDate]);

  const handleCalenderClicks: handleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    value: Date
  ) => {
    if (!(startDate && !endDate)) {
      startDateSet(value);
      endDateSet(undefined);
    } else if (value >= startDate) {
      if (checkBookedRangeDays(startDate, value, bookedDays)) {
        endDateSet(value);
      }
    } else {
      startDateSet(value);
    }
  };

  let currentMonth = today.getMonth() + 1;
  let year = today.getFullYear();
  const monthMax = 24;
  let q = currentMonth;
  return (
    <>
      <div className="flex gap-16">
        {Array.from(Array(monthMax).keys()).map((month, i) => {
          q++;
          if (q > 13) {
            q = 2;
          }
          return (
            <div key={i}>
              <Month
                bookedDays={bookedDays}
                handleClick={handleCalenderClicks}
                month={q - 1}
                year={year + roundDown((currentMonth + i - 1) / 12)}
                dateRange={[startDate, endDate]}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DatePicker;
