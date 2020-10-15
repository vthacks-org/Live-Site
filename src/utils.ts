import { IEvent } from './interfaces';
import { RelativeTime } from './enums';
import { ONE_MINUTE_MILLISECOND } from './constants';

export function identity<T>(arg: T): T {
	return arg;
}

export function to12HourTime(date: Date) {
	const hours = date.getHours();
	const minutes = date.getMinutes();

	return `${hours % 12 === 0 ? 12 : hours % 12}:${minutes < 10 ? '0' : ''}${minutes}${hours % 24 < 12 ? 'AM' : 'PM'}`;
}

export function dateToMinutesInDay(date: Date) {
	return date.getHours() * 60 + date.getMinutes();
}

export function getRelativeDayTime(date: Date): RelativeTime {
	const today = new Date();

	if (
		date.getFullYear() === today.getFullYear() &&
		date.getMonth() === today.getMonth() &&
		date.getDate() === today.getDate()
	) {
		return RelativeTime.Present;
	} else if (date.getTime() < today.getTime()) {
		return RelativeTime.Past;
	} else {
		return RelativeTime.Future;
	}
}

export function getRelativeEventTime(event: IEvent): RelativeTime {
	const start = dateToMinutesInDay(event.start);
	const end = start + event.duration;
	const now = dateToMinutesInDay(new Date());

	if (start === end && start === now) {
		return RelativeTime.Present;
	} else if (now < start) {
		return RelativeTime.Future;
	} else if (now >= end) {
		return RelativeTime.Past;
	} else {
		return RelativeTime.Present;
	}
}

export function formattedEventTime(event: IEvent) {
	return event.duration === 0
		? to12HourTime(event.start)
		: `${to12HourTime(event.start)} - ${to12HourTime(
				new Date(event.start.getTime() + event.duration * ONE_MINUTE_MILLISECOND)
		  )}`;
}
