export function hasThisNumDecimals(number: number): boolean {
    return (number % 1) !== 0
}

/** getNumberAndDecimalPart divides a number into its "whole part" and "decimal part".
 * IMPORTANT: Keep both types as string, specially the "decimal part" or information loss in that number may ocur
 */
export function getNumberAndDecimalPart(num: (number | string)): { wholePart: string, decimalPart: string } {
    if (typeof num === 'number') num = num.toString();

    const parts = num.split(".");
    const wholePart = parts[0];
    const decimalPart = parts[1] || "";

    return { wholePart, decimalPart };
}

// format a number adding thousands dots and a decimal coma if necessary
// hadDecimals parameter indicates if the original string where the number came from had decimals
export function formatNumberWithThousandDots(number: number, hadDecimals?: boolean): string {
    const numberHasDecimals: boolean = hasThisNumDecimals(number)
    const numberString = (numberHasDecimals || hadDecimals) ? number.toFixed(2): number.toString();

    // Separate the whole number part from the decimal part
    const { wholePart, decimalPart } = getNumberAndDecimalPart(numberString)

    // Add dots for thousands in the whole number part each three characters (using a regex to match them)
    const formattedWholeNumber = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Add a dot if the number has a decimal part
    const formattedDecimal = decimalPart ? `.${decimalPart}` : "";

    // Combine the whole number and decimal parts
    const formattedNumber = `${formattedWholeNumber}${formattedDecimal}`;

    return formattedNumber;
}

// This check if a string matches a percentage expression (like "25,5%" and "22,%" using comma or "25.5%" and "22.%" using dot)
function matchesPercentageExpression(str: string): boolean {
    const percentageExpression: RegExp = /^-?(\d)+(,|\.)?(\d)*%$/
    return percentageExpression.test(str)
}

// Returns a percentage formatted the right way or the same string if it is not a percentage
export function formatPercentage(str: string): string {
    const isPercentageExpression = matchesPercentageExpression(str)
    if (!isPercentageExpression) {
        return str // Leave string unchanged
    }

    let formattedPercentage = str

    // Deletes comma if it is followed by % sign, such as in 29,%
    const commaPosition: number = str.indexOf(',');
    if (commaPosition !== -1 && (str[commaPosition] + 1 === '%')) {
        formattedPercentage = str.replace(',', '')    
    }

    // Finish formating the percentage expression
    const numWithoutPercentage: string = formattedPercentage.substring(0, formattedPercentage.length - 1)
    const processedNumber: string = numWithoutPercentage.replace(',', '.')
    const hasDecimals: boolean = processedNumber.indexOf('.') !== -1
    const numberPart: number = Number(processedNumber)
    formattedPercentage = formatNumberWithThousandDots(numberPart, hasDecimals)

    return `${formattedPercentage}%`
}

// Removes the last character (the percentage sign) and return a number
// Example input: "2.64%". Example output 2.64
export function fromPercentageToNum(percentage: string): number {
    // The following line is needed to avoid NaN error when converting percentages in some cases
    let num: string|number = percentage.substring(0, percentage.length - 1)
    return Number(num)
}