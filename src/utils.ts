import { EventCategory, RelativeTime, SortKeys } from "./enums"

import {
  ONE_MINUTE_MILLISECOND,
  ONE_DAY_MILLISECOND,
  ONE_DAY_MINUTE,
  LONG_DAY_NAMES,
  SHORT_DAY_NAMES,
  SHORT_MONTH_NAMES,
  LONG_MONTH_NAMES,
  eventCatPrio,
} from "./constants"
import {
  TIMEZONE_ABBR,
  DAY_OF_THE_EVENT,
  EVENT_END_TIME_DATE,
  HACK_LENGTH,
} from "./constants"
import { ICategoryEventList, IEvent, IEventDay } from "./interfaces"

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

function __daysApart__(start: Date, end: Date) {
  var n = 0
  if (end.getTime() > start.getTime()) {
    while (!isSameDay(start, end)) {
      n++
      start = new Date(start.getTime() + ONE_DAY_MILLISECOND)
    }
    return n
  }
  while (!isSameDay(start, end)) {
    n++
    start = new Date(start.getTime() - ONE_DAY_MILLISECOND)
  }
  return n
}

export function splitEvent(event: IEvent): IEvent[] {
  const eventLegs: IEvent[] = []
  let currEvent: IEvent = event
  let currDuration = event.duration

  while (currDuration > 0) {
    // Check if duration extends past event

    if (
      event.start.getTime() + currDuration * 60 * 1000 >
      EVENT_END_TIME_DATE.getTime()
    ) {
      //Extends past, cut off event
      currDuration =
        (event.start.getTime() +
          currDuration * 60 * 1000 -
          EVENT_END_TIME_DATE.getTime()) /
          (1000 * 60) -
        2
    }

    // Time left in the day
    const timeLeft =
      ONE_DAY_MINUTE -
      (currEvent.start.getHours() * 60 + currEvent.start.getMinutes())

    const legStart = currEvent.start

    // New duration is either time left in day, or time remaining in event
    const legDuration = timeLeft < currDuration ? timeLeft : currDuration

    // Pull off vals from the currEvent to populate the new event leg
    const {
      name,
      subtitle,
      category,
      location,
      description,
      contentLink,
      callLink,
      display,
    } = currEvent

    const newLeg: IEvent = {
      display,
      subtitle,
      name,
      start: legStart,
      duration: legDuration,
      category,
      location,
      description,
      contentLink,
      callLink,
    }

    const newStart =
      currDuration > 0
        ? new Date(legStart.getTime() + timeLeft * 60 * 1000)
        : null
    eventLegs.push(newLeg)
    currDuration -= newLeg.duration

    currEvent = {
      display,
      subtitle,
      name,
      start: newStart,
      duration: currDuration,
      category,
      location,
      description,
      contentLink,
      callLink,
    }
  }
  if (
    event.duration <= 0 &&
    eventLegs.length == 0 &&
    event.start.getTime() < EVENT_END_TIME_DATE.getTime()
  ) {
    eventLegs.push(event)
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
      const daysBetween = __daysApart__(DAY_OF_THE_EVENT, eventStart)
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

export function sortEventsDuration(events: IEvent[], key: SortKeys) {
  const compare = (a: IEvent, b: IEvent) => {
    switch (key) {
      case SortKeys.Descending:
        return b.duration - a.duration
      default:
        return a.duration - b.duration
    }
  }

  return events.sort(compare)
}

export function sortCategoryBucketKeys(buckets: ICategoryEventList, key) {
  const compare = (a: string, b: string) => {
    switch (key) {
      case SortKeys.Descending:
        return eventCatPrio[b] - eventCatPrio[a]
      default:
        return eventCatPrio[a] - eventCatPrio[b]
    }
  }
  return Object.keys(buckets).sort(compare)
}

export function calculateTimelineRows(events: IEvent[]) {
  const checkConflicts = (a: IEvent, b: IEvent) => {
    // TODO: Check both ways

    return (
      (a.start.getTime() <= b.start.getTime() &&
        a.start.getTime() + a.duration * 60 * 1000 >= b.start.getTime()) ||
      (b.start.getTime() <= a.start.getTime() &&
        b.start.getTime() + b.duration * 60 * 1000 >= a.start.getTime())
    )
  }

  const canAdd = (arr, el) => {
    for (let i = 0; i < arr.length; i++) {
      if (checkConflicts(arr[i], el)) {
        return false
      }
    }
    return true
  }

  const add = (matrix: IEvent[][], el: IEvent) => {
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[0][0] === null) {
        matrix[0][0] = el
      } else if (canAdd(matrix[i], el)) {
        matrix[i].push(el)
      } else {
        let k = 0
        while (!canAdd(matrix[i + k], el)) {
          if (i + k === matrix.length - 1) {
            matrix.push([])
          }
          k++
        }
        matrix[i + k].push(el)
      }
      break
    }
  }
  let rows: IEvent[][] = [[null]]

  const e = sortEventsDuration(events, SortKeys.Descending)
  e.forEach(el => {
    add(rows, el)
  })
  return rows
}
