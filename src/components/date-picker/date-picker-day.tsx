import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { DayProps, Status } from "../../types/date-picker.types";
import {
  checkBookedDays,
  checkEndBookedDays,
  checkStartBookedDays,
} from "../../utils/date-picker.utils";

export const Day = ({
  handleClick,
  year,
  month,
  value,
  dateRange,
  bookedDays,
}: DayProps) => {
  const [status, setStatus] = useState<Status>(Status.None);
  const dayDate = useMemo(
    () => new Date(year, month - 1, value ? Number(value) : 1),
    [month, value, year]
  );

  useEffect(() => {
    if (dayDate !== dateRange[0] || dayDate !== dateRange[1])
      setStatus(Status.None);
    if (
      dateRange[0] &&
      dateRange[1] &&
      dayDate > dateRange[0] &&
      dayDate < dateRange[1]
    )
      setStatus(Status.Between);
    if (dateRange[0] === dayDate) setStatus(Status.Start);
    if (dateRange[1] === dayDate) setStatus(Status.End);
    if (dayDate < new Date()) setStatus(Status.Before);
    if (checkBookedDays(dayDate, bookedDays)) setStatus(Status.Booked);
    if (checkStartBookedDays(dayDate, bookedDays))
      setStatus(Status.StartBooked);
    if (checkEndBookedDays(dayDate, bookedDays)) setStatus(Status.EndBooked);
  }, [dateRange, dayDate, bookedDays]);

  return (
    <div
      className={classNames(
        status === Status.Start &&
          "start rounded-l-2xl bg-green-200 text-green-700 border-green-500 border-l border-y",
        status === Status.End &&
          "end rounded-r-full bg-green-200 text-green-700 border-green-500 border-r border-y",
        status === Status.Between &&
          "between bg-green-200 text-green-700 border-green-500 border-y",
        status === Status.None &&
          "none hover:rounded-full hover:bg-blue-50 border-blue-200 hover:border hover:text-gray-900",
        status === Status.Booked &&
          "booked bg-red-200 text-red-700 border-y border-y-red-300 cursor-not-allowed",
        status === Status.StartBooked &&
          "startbooked rounded-l-full bg-red-200 text-red-700 border-y border-l border-red-300",
        status === Status.EndBooked &&
          "endbooked rounded-r-full bg-red-200 text-red-700 border-y border-r  border-red-300",
        status === Status.Before && "before text-gray-400 pointer-events-none",
        dayDate.toDateString() === new Date().toDateString() &&
          "border-b-4 border-blue-500",
        value === "" && "opacity-0",
        year + "-" + month + "-" + value,
        "w-12 h-10 flex items-center justify-center"
      )}
      onClick={(e) => {
        if (status !== Status.Booked) {
          handleClick(e, dayDate);
        }
      }}
    >
      <p>{value}</p>
    </div>
  );
};
