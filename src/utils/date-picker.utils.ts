import { bookedDays } from "../types/date-picker.types";


//Helpers
export const getNumberOfRows = (
    numberOfDaysInMonth: number,
    dayOfTheWeek: number
  ) => {
    switch (numberOfDaysInMonth - (21 + (7 - dayOfTheWeek))) {
      case 0:
        return 4;
      case 8:
      case 9:
        return 6;
      default:
        return 5;
    }
  };
  
  export const getOneMonthArray = (
    dayOfWeek: number,
    numberOfDaysInMonth: number
  ) => {
    let dates = new Array<number | string>(42);
    // assign first day to array index equal to day of week of first day
    dates[dayOfWeek] = 1;
    // fill in indexes from 1 through numberOfDaysInCurrentMonth
    let nextDay = 2;
    for (
      let i = dayOfWeek + 1;
      i < dayOfWeek + numberOfDaysInMonth;
      i++, nextDay++
    ) {
      dates[i] = nextDay;
    }
    // assign or leave empty indexes between 0 and first day
    // assign value or leave empty indexes between last day of month and end of that row
    for (let i = 0; i < dates.length; i++) {
      if (dates[i] === undefined) {
        dates[i] = "";
      }
    }
    return dates;
  };

 export const roundDown = (number:number) => {
    const decimals = 0;
    return ( Math.floor( number * Math.pow(10, decimals) ) / Math.pow(10, decimals) );
}

export const totalDays = (date_1:Date | undefined, date_2:Date | undefined) =>{
  if (date_1=== undefined  || date_2=== undefined) return null
  let difference = date_2.getTime() - date_1.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays +1;
}
  

export const checkBookedDays = (dayDate: Date, bookedDays: bookedDays | undefined) => {
  return bookedDays?.find((day) => {
    return dayDate >= day.startDate && dayDate <= day.endDate;
  });
};

export const checkStartBookedDays = (dayDate: Date, bookedDays: bookedDays | undefined) => {
  return bookedDays?.find((day) => {
    return dayDate.toDateString() === day.startDate.toDateString();
  });
};

export const checkEndBookedDays = (dayDate: Date, bookedDays: bookedDays | undefined) => {
  return bookedDays?.find((day) => {
    return dayDate.toDateString() === day.endDate.toDateString();
  });
};


const getDaysArray = (startDate: Date, endDate: Date) => {
  for(var arr=[],dt=new Date(startDate); dt<=new Date(endDate); dt.setDate(dt.getDate()+1)){
      arr.push(new Date(dt));
  }
  return arr;
};

export const checkBookedRangeDays = (startDate: Date, endDate: Date, bookedDays: bookedDays | undefined) => {
  const checkBookedDaysInsideSelection = bookedDays?.map((day) => {
    const BookedRangeDays = getDaysArray(day.startDate,day.endDate);
    const checkBookedDays = BookedRangeDays.map((bookedDay) => {
        return bookedDay >= startDate && bookedDay <= endDate;
    })
    return checkBookedDays.includes(true);
  })
  return !checkBookedDaysInsideSelection?.includes(true);
};