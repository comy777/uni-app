import dayjs from "dayjs"

// getMonthName gets the full name of the month. Valid range of numbers [1..12]
// the "-1" is because dayjs counts months from 0 to 11 but we want to use from 1 to 12.
export const getMonthName = (num: number): string => {
    return dayjs().month(num - 1).format("MMMM")
}

// matchStringDate matches a date formated as a string like "YYYY-MM-DD"
//
// Validation rules:
//
// Year is from: 1900 to 9999
// Month is from: 01 to 12
// Day is from: 01 to 31
export const matchStringDate = (strDate: string): boolean => {
    const datePattern = /^(19|20)\d{2}-(0[1-9]|1[0-2])-([0-2][1-9]|3[01])$/;
    return datePattern.test(strDate)
}

// getMonthFromDate gets the month from a date in format "YYYY-MM-DD"
// returns -1 on error
export const getMonthFromDate = (dateStr: string) => {
    const dateArr = dateStr.split("-")

    if (!matchStringDate(dateStr)) {
        console.error("Date is not in a valid format. Expected format YYYY-MM-DD and a date string within valid range")
        return -1
    }

    return Number(dateArr[1])
}

// getYearFromDate gets the year from a date in format "YYYY-MM-DD"
// returns -1 on error
export const getYearFromDate = (dateStr: string) => {
    const dateArr = dateStr.split("-")

    if (!matchStringDate(dateStr)) {
        console.error("Date is not in a valid format. Expected format YYYY-MM-DD and a date string within valid range")
        return -1
    }

    return Number(dateArr[0])
}

/** currentISODate gets the current UTC Date in ISO format */
export const getCurrentISODate = (): string => {
    const now = dayjs().utc();
    const isoString = now.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    return isoString;
}