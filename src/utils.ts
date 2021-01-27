import { RelativeTime } from "./enums"

import {
  ONE_MINUTE_MILLISECOND,
  ONE_DAY_MILLISECOND,
  ONE_DAY_MINUTE,
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
  return `${LONG_DAY_NAMES[date.getDay()]}, ${
    LONG_MONTH_NAMES[date.getMonth()]
  } ${date.getDate()}`
}

export function formatDateShort(date: Date) {
  return `${SHORT_DAY_NAMES[date.getDay()]}, ${
    SHORT_MONTH_NAMES[date.getMonth()]
  } ${date.getDate()}`
}

export function daysApart(start: Date, end: Date) {
  const day1 = start.getDate()
  const day2 = new Date(end.getTime() - 1).getDate()

  let i = day1
  let n = 0
  while (i != day2) {
    i = new Date(start.getTime() + ONE_DAY_MILLISECOND * n + 1).getDate()
    n++
  }
  return n
}

export function splitEvent(event: IEvent): IEvent[] {
  const eventLegs: IEvent[] = []
  let currEvent: IEvent = event
  let currDuration = event.duration

  while (currDuration > 0) {
    const timeLeft =
      ONE_DAY_MINUTE -
      (currEvent.start.getHours() * 60 + currEvent.start.getMinutes())

    const {
      name,
      category,
      location,
      description,
      contentLink,
      callLink,
      display,
    } = currEvent

    const newStart =
      eventLegs.length === 0
        ? currEvent.start
        : new Date(currEvent.start.getTime() + timeLeft * 60 * 1000)

    const newDuration = timeLeft < currDuration ? timeLeft : currDuration

    const newLeg: IEvent = {
      display,
      name,
      start: newStart,
      duration: newDuration,
      category,
      location,
      description,
      contentLink,
      callLink,
    }

    currEvent = newLeg
    eventLegs.push(currEvent)
    currDuration = currDuration - currEvent.duration
  }
  return eventLegs
}

export function daysFromSchedule(schedule: IEvent[]): IEventDay[] {
  schedule.forEach(event => (event.start = new Date(event.start)))

  let tempDays: IEventDay[] = []
  for (let i = 0; i < HACK_LENGTH; i++) {
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
    if (event.display) {
      // Pushes event to the correct days
      const eventStart = event.start
      const daysBetween = daysApart(DAY_OF_THE_EVENT, eventStart)
      if (daysBetween >= 0 && daysBetween < HACK_LENGTH) {
        // If event should span across two days, edit the event
        // to last for the entirety of the first day, and the
        // last day to start at 12am and end at the correct time

        const eventLegs = splitEvent(event)
        for (let i = 0; i < eventLegs.length; i++) {
          tempDays[daysBetween + i].events.push(eventLegs[i])
        }
      }
    }
  })

  const days = tempDays

  days.forEach(day =>
    day.events.forEach(event => (event.duration = Math.abs(event.duration)))
  )

  return days
}
