import { RelativeTime } from "./enums"
import { ONE_MINUTE_MILLISECOND } from "./constants"
import { TIMEZONE_ABBR } from "./constants"
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
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}

export function daysFromSchedule(schedule: IEvent[]) {
  const dayOneDate = new Date("2021-02-17T00:00:00-05:00")
  const dayTwoDate = new Date(dayOneDate.getTime() + 1000 * 60 * 60 * 24)
  const dayThreeDate = new Date(dayTwoDate.getTime() + 1000 * 60 * 60 * 24)
  schedule.forEach(event => (event.start = new Date(event.start)))

  let dayOneEvents: IEvent[] = []
  let dayTwoEvents: IEvent[] = []
  let dayThreeEvents: IEvent[] = []
  schedule.forEach(event => {
    if (isSameDay(event.start, dayOneDate)) {
      dayOneEvents.push(event)
    }
    if (isSameDay(event.start, dayTwoDate)) {
      dayTwoEvents.push(event)
    }
    if (isSameDay(event.start, dayThreeDate)) {
      dayThreeEvents.push(event)
    }
  })

  const firstDay: IEventDay = {
    index: 0,
    title: "Wed",
    longTitle: "Wednesday February 17",
    date: new Date("2021-02-17T00:00:00-05:00"),
    events: dayOneEvents,
  }
  const secondDay: IEventDay = {
    index: 1,
    title: "Thurs",
    longTitle: "Thursday February 18",
    date: new Date("2021-02-18T00:00:00-05:00"),
    events: dayTwoEvents,
  }
  const thirdDay: IEventDay = {
    index: 2,
    title: "Fri",
    longTitle: "Friday February 19",
    date: new Date("2021-02-19T00:00:00-05:00"),
    events: dayThreeEvents,
  }

  const dayAfterLastDay = new Date("2021-02-20T00:00:00-05:00")

  const days: [IEventDay, IEventDay, IEventDay] = [
    firstDay,
    secondDay,
    thirdDay,
  ]

  days.forEach(day =>
    day.events.forEach(event => (event.duration = Math.abs(event.duration)))
  )
  return days
}
