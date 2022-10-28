import { DaysProps } from "../../types/date-picker.types";
import { getOneMonthArray } from "../../utils/date-picker.utils";
import { Day } from "./date-picker-day";

export const Days = (props: DaysProps) => {
  const dates = getOneMonthArray(props.dayOfWeek, props.numberOfDaysInMonth);
  let rowNumber = 0;
  rowNumber += props.rowNumber;
  let startIndex: number = rowNumber * 7;
  let endIndex = startIndex + 7;

  return (
    <>
      <div className="grid grid-cols-7 text-center">
        {dates.slice(startIndex, endIndex).map((d, i) => (
          <Day
            key={i}
            month={props.month}
            year={props.year}
            handleClick={props.handleClick}
            dateRange={props.dateRange}
            bookedDays={props.bookedDays}
            value={d}
          />
        ))}
      </div>
    </>
  );
};
