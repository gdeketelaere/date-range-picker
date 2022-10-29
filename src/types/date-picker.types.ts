import { Dispatch, SetStateAction } from "react";

export type DayProps = MonthProps & {
    value: number | string;
  };

export type DaysProps = MonthProps & {
    dayOfWeek: number;
    numberOfDaysInMonth: number;
    rowNumber: number;
  };

export type MonthProps = {
    month: number;
    year: number;
    dateRange: dateRange;
    bookedDays?: bookedDays;
    handleClick: handleClick;
  };
export type datePicked = Date | undefined;
export type dateRange = datePicked[];
export type handleClick = (
  e: React.MouseEvent<HTMLDivElement>,
  value: Date
) => void;
export type bookedDays = {
  startDate: Date;
  endDate: Date;
}[];
export type DatePickerProps = {
  setDateRange: Dispatch<SetStateAction<datePicked[] | undefined>>;
  bookedDays?: bookedDays;
};

export enum Status {
    Start = "START",
    End = "END",
    None = "NONE",
    Between = "BETWEEN",
    Booked = "BOOKED",
    StartBooked = "STARTBOOKED",
    EndBooked = "ENDBOOKED",
    Before = "BEFORE",
  }
