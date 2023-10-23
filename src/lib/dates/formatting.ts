import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc)//set
dayjs.extend(customParseFormat);//set

const ISO_DATE_ERROR_MESSAGE =
  'Error while converting the ISO Date. Please check that you provided a valid ISO Date of type "string"';

/** Check that the ISO date string is likely to be in a correct format */
function isValidISODate(ISO_Date: string): boolean {
  const date = ISO_Date.split("T")[0];
  const MAX_CHARACTERS_OF_A_DATE = 10;
  const EXPECTED_NUMBER_OF_DASHES = 2;

  const dateSplit = date.split("-");
  const numberOfDashes = dateSplit.length - 1;

  if (date.length > MAX_CHARACTERS_OF_A_DATE || numberOfDashes !== EXPECTED_NUMBER_OF_DASHES) {
    return false;
  }
  return true;
}

/**
 * Change the format from an ISO Date to an USA Date (does not modify the time zone)
 *
 * Expected input format example: "2022-01-31T06:30:28.57642+00:00"
 * Expected output format example: "2022/31/01"
 *
 * Please note that this function is not fully safe/correct and can throw bad format conversions in some cases.
 *
 */
export function fromISODateToUSADate(ISO_Date: string) {
  if (!isValidISODate(ISO_Date)) {
    throw Error(ISO_DATE_ERROR_MESSAGE);
  }
  const date = new Date(ISO_Date);
  return dayjs(date).format("MM/DD/YY");
}

/**
 * Change the format from an ISO Date to an USA Date (does not modify the time zone)
 *
 * Expected input format example: "2022-01-31T16:30:28.57642+00:00"
 * Expected output format example: { date: "2022/31/01", time: "4:30 PM" }
 */
export function getDateAndTimeFromISODate(ISO_Date: string, section: string = '') {
  const date = new Date(ISO_Date);
  let fullDate;
  dayjs.extend(utc)
  switch (section) {
    case "":
      fullDate = dayjs(date).utc().format("MM/DD/YY hh:mm A");
      break;
    case "chat":
      fullDate = dayjs(date).format("MM/DD/YY hh:mm A");
      break;
    default:
      fullDate = dayjs(date).utc().format("MM/DD/YY hh:mm A");
      break;
  }
  const [ theDate, time, AM_PM ] = fullDate.split(' ');
  const theTime = `${time} ${AM_PM}`;
  return {
    date: theDate,
    time: theTime,
  };
}

// fromUSADateStringToPGDate converts a date from USA format to the format expected by PostgreSQL DB's Date type.
export function fromUSADateStringToPGDate(usaDate: string): string {
  let separator = '-';
  const includesDashes = usaDate.includes('-')
  const includesSlashes = usaDate.includes('/')

  // Handle input errors
  if ( !includesDashes && ! includesSlashes ) {
      throw new Error("Date should be separated by dashes or slashes. E.g: 31/12/2022")
  }
  if ( includesDashes && includesSlashes ) {
      throw new Error("Date should be separated by ONLY dashes or slashes (not both). E.g: 31-12-2022")
  }
  
  // Change separator if needed
  if (includesSlashes) {
      separator = '/'
  }

  const splittedDate = usaDate.split(separator)
  const year = splittedDate[2]
  const month = splittedDate[1]
  const day = splittedDate[0]

  return `${year}-${month}-${day}`
}

/**
 * Get the difference in days between the given date and the current date.
 * @param {string} date - Date in ISO format (e.g., "2023-07-11T20:43:10.259764+00:00").
 * @returns {number} - Difference in days.
 */
 export function getDiffDays(date: string): number {
  const start = dayjs().startOf('day'); // Current date at 00:00
  const end = dayjs(date).startOf('day'); // Given date at 00:00
  return start.diff(end, 'days');
}

/**
 * Get a formatted representation of the date for conversation messages.
 * @param {string} date - Date in ISO format (e.g., "2023-07-11T20:43:10.259764+00:00").
 * @returns {string} - Formatted representation of the date.
 */
 export function getFormatDateMessageConversation(date: string, reminder?: boolean): string {
  const diffDays = getDiffDays(date);
  const formattedDate = dayjs(date, { format: 'YYYY-MM-DD hh:mm A' }); // Use user's default timezone

  const currentYear = dayjs().year();
  const messageYear = formattedDate.year();

  if (diffDays === 0) {
    return reminder ? `Today ${formattedDate.format('hh:mm A')}` : formattedDate.format('hh:mm A'); // AM/PM time
  } else if (diffDays === 1) {
    return 'Yesterday ' + formattedDate.format('hh:mm A'); // Yesterday + AM/PM time
  } else if (diffDays <= 7) {
    return formattedDate.format('ddd hh:mm A'); // Day of the week + AM/PM time
  } else {
    if (messageYear === currentYear) {
      return formattedDate.format('MM/DD hh:mm A'); // Month day and AM/PM time
    } else {
      return formattedDate.format('MM/DD, YYYY hh:mm A'); // Month day year and AM/PM time
    }
  }
}

/**
 * Formats and categorizes a list of messages with appropriate headings like 'Today', 'Yesterday', last week's days, or specific dates.
 *
 * @param {Array} messages - An array of message objects to be formatted and categorized.
 * @returns {Array} - The formatted messages with appropriate headings.
 */
 export function formatMessageList(messages: any[]): any[] {
  // Remove existing 'content' fields
  for (const message of messages) {
    delete message.content;
  }

  // Sort messages by date (ensure sorting before pagination)
  const sortedMessages = messages.sort((a, b) => a.created_at.localeCompare(b.created_at));

  // Format and categorize messages
  const formattedMessages = [];
  let currentDateCategory = '';
  const currentYear = new Date().getFullYear(); // Get current year

  for (const message of sortedMessages) {
    const formattedDate = dayjs(message.created_at).format('YYYY-MM-DD');

    // Calculate the difference in days between the current date and the message date
    const daysDifference = dayjs().diff(formattedDate, 'days');

    // Determine message category (Today, Yesterday, last week's days, or Date)
    let category = null;
    if (daysDifference === 0) {
      category = 'Today';
    } else if (daysDifference === 1) {
      category = 'Yesterday';
    } else if (daysDifference <= 7) {
      category = dayjs(formattedDate).format('dddd'); // Show day of the week
    } else {
      const messageYear = dayjs(formattedDate).year();
      category = messageYear === currentYear ? dayjs(formattedDate).format('MMMM D') : dayjs(formattedDate).format('MMMM D, YYYY');
    }

    // Add category if different from previous category
    if (category !== currentDateCategory) {
      message.content = category;
      currentDateCategory = category;
    }

    // Add message without 'content' property
    formattedMessages.push(message);
  }

  return formattedMessages;
}

export function getDiffMinutues(date: string): number {
  const start = dayjs().startOf('minutes'); // Current date at 00:00
  const end = dayjs(date).startOf('minutes'); // Given date at 00:00
  return start.diff(end, 'minutes');
}
