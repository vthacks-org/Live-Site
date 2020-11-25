import { RelativeTime } from "./enums"
import {
  ONE_MINUTE_MILLISECOND,
  ONE_DAY_MILLISECOND,
  LONG_DAY_NAMES,
  SHORT_DAY_NAMES,
  SHORT_MONTH_NAMES,
  LONG_MONTH_NAMES,
} from "./constants"
import {
  TIMEZONE_ABBR,
  DAY_OF_THE_EVENT,
  EVENT_END_TIME_DATE,
  HACK_LENGTH,
} from "./constants"
import { IEvent, IEventDay } from "./interfaces"

export function identity<T>(arg: T): T {
  return arg
}

export function to12HourTime(date: Date) {
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${hours % 12 === 0 ? 12 : hours % 12}:${
    minutes < 10 ? "0" : ""
  }${minutes}${hours % 24 < 12 ? "AM" : "PM"}`
}

export function dateToMinutesInDay(date: Date) {
  return date.getHours() * 60 + date.getMinutes()
}

export function getRelativeDayTime(date: Date): RelativeTime {
  const today = new Date()

  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  ) {
    return RelativeTime.Present
  } else if (date.getTime() < today.getTime()) {
    return RelativeTime.Past
  } else {
    return RelativeTime.Future
  }
}

export function getRelativeEventTime(event: IEvent): RelativeTime {
  const start = dateToMinutesInDay(event.start)
  const end = start + event.duration
  const now = dateToMinutesInDay(new Date())

  if (start === end && start === now) {
    return RelativeTime.Present
  } else if (now < start) {
    return RelativeTime.Future
  } else if (now >= end) {
    return RelativeTime.Past
  } else {
    return RelativeTime.Present
  }
}

export function formattedEventTime(event: IEvent) {
  return event.duration === 0
    ? `${to12HourTime(event.start)} ${TIMEZONE_ABBR}`
    : `${to12HourTime(event.start)} - ${to12HourTime(
        new Date(
          event.start.getTime() + event.duration * ONE_MINUTE_MILLISECOND
        )
      )} ${TIMEZONE_ABBR}`
}

export function isSameDay(first: Date, second: Date) {
  console.log(first, second)
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}

export function formatDateLong(date: Date) {
  return `${LONG_DAY_NAMES[date.getDay() - 1]}, ${
    LONG_MONTH_NAMES[date.getMonth()]
  } ${date.getDate()}`
}

export function formatDateShort(date: Date) {
  return `${SHORT_DAY_NAMES[date.getDay() - 1]}, ${
    SHORT_MONTH_NAMES[date.getMonth()]
  } ${date.getDate()}`
}

export function daysApart(start: Date, end: Date) {
  const result = (end.getTime() - start.getTime()) / ONE_DAY_MILLISECOND

  return end.getTime() >
    new Date(start.getTime() + ONE_DAY_MILLISECOND * result).getTime()
    ? Math.ceil(result)
    : Math.floor(result)
}

export function daysFromSchedule(schedule: IEvent[]) {
  schedule.forEach(event => (event.start = new Date(event.start)))

  let tempDays: IEventDay[] = []
  for (let i = 0; i < HACK_LENGTH; i++) {
    console.log(HACK_LENGTH)
    const date = new Date(DAY_OF_THE_EVENT.getTime() + ONE_DAY_MILLISECOND * i)
    tempDays[i] = {
      index: i,
      title: formatDateShort(date),
      longTitle: formatDateLong(date),
      date: date,
      events: [],
    }
  }

  schedule.forEach(event => {
    const daysBetween = daysApart(DAY_OF_THE_EVENT, event.start)
    if (daysBetween >= 0 && daysBetween < HACK_LENGTH) {
      tempDays[daysBetween].events.push(event)
    }
  })

  const days = tempDays

  days.forEach(day =>
    day.events.forEach(event => (event.duration = Math.abs(event.duration)))
  )
  return days
}
