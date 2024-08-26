import { shortDate } from "../consts";

export const dateToString = (date) => {
	date = new Date(date);
	const newDate = date.toString();
	const day = newDate.substring(8, 10);
	const month = shortDate[newDate?.substring(4, 7)];
	const year = newDate.substring(11, 15);
	const resultDate = day + " " + month + " " + year;
	return resultDate;
}

export const stringToDate = (str) => {
	const newDate = new Date(str);
	return newDate;
}