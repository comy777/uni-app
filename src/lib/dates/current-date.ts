import dayjs from "dayjs";

export function getCurrentTime(): string {
  const currentDatetime = new Date();
  return dayjs(currentDatetime).format("HH:mm");
}

export function getCurrentDate(): string {
  const currentDatetime = new Date();
  return dayjs(currentDatetime).format("YYYY-MM-DD");
}
export function getPreviewDate(): string {
  const currentDatetime = new Date();
  currentDatetime.setMonth(currentDatetime.getMonth()-1);
  return dayjs(currentDatetime).format("YYYY-MM-DD");
}

export function getCurrentYear(): number {
  const currentYear = new Date().getFullYear();
  return currentYear;
}

export function getCurrentMonth() {
  const currentMonth = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };
  return currentMonth;
}

export function getDateFormatted(date:any): string {
  return dayjs(date).format("YYYY-MM-DD");
}

export function getDateFormattedWithHours(date:Date): string {
  return dayjs(date).format("MMMM D, YYYY h:mm A");
}

export function getQuarter(year: String|any, quarter: String|any): any {
  let start = "";
  let end = "";
  if (quarter == "Q1") {
    start = `${year}-01-01`;
    end = `${year}-03-31`;
  }
  if (quarter == "Q2") {
    start = `${year}-04-01`;
    end = `${year}-06-30`;
  }
  if (quarter == "Q3") {
    start = `${year}-07-01`;
    end = `${year}-09-30`;
  }
  if (quarter == "Q4") {
    start = `${year}-10-01`;
    end = `${year}-12-31`;
  }
  return {
    start: dayjs(start).format("YYYY-MM-DD"),
    end: dayjs(end).format("YYYY-MM-DD"),
  };
}

export function getDateFormatted2(date:any): string {
  return dayjs(date).format("MM-DD-YYYY");
}

export function getFormattedWithHours(date:Date): string {
  return dayjs(date).format("hh:mm:ss");
}

export function getCurrenTimestampWithTimeZone(): string {
  const date = new Date();
  const currentDate = dayjs(date).format("YYYY-MM-DD");
  const currentDatetime = dayjs(date).format("hh:mm:ss");
  return `${currentDate}T${currentDatetime}.000000+00:00`;
}

export function getDateDiff(date1: string, date2: string): any {
  let diffHours = dayjs(date2).diff(dayjs(date1), 'hour');
  let diffMinutes : number = dayjs(date2).diff(dayjs(date1), 'minute');
  let diffSeconds = dayjs(date2).diff(dayjs(date1), 'second');
  
  // Parse float

  let totalMinutes = Math.floor(diffSeconds / 60)
  let seconds = diffSeconds % 60;
  let hours = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;
  let days= 0; 

  while (hours >= 24) {
    hours = hours-24
    days++
  }
  
  return `${days <= 0 ? '' : days + ' days - '}${diffHours === 0 ? '00' : hours}` +
    `:${diffMinutes === 0 ? '00' : minutes}:${String(diffSeconds === 0 ? '00' : seconds)}`;
}

export  function totalDaysInMonth(month: number, year: number) {
	return new Date(year, month, 0).getDate();
}

export function getDateFormatted3(date:any): string {
  return dayjs(date).format("DD-MM-YYYY");
}