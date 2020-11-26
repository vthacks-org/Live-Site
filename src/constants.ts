import { EventCategory } from "./enums"
import { IEvent } from "./interfaces"
import { daysApart } from "./utils"

export const SHOW_AS_LIVE_DATES = true
export const MOBILE_BREAKPOINT_WIDTH = 992
export const ONE_MINUTE_MILLISECOND = 60000
export const ONE_DAY_MILLISECOND = 1000 * 60 * 60 * 24
export const ONE_DAY_MINUTE = 24 * 60
export const EVENT_LIST_ITEM_HEIGHT = 72
export const CLOCK_EMOJI_HOUR_LIST = [
  "🕛",
  "🕐",
  "🕑",
  "🕒",
  "🕓",
  "🕔",
  "🕕",
  "🕖",
  "🕗",
  "🕘",
  "🕙",
  "🕚",
]
export const CLOCK_EMOJI_THIRTY_LIST = [
  "🕧",
  "🕜",
  "🕝",
  "🕞",
  "🕟",
  "🕠",
  "🕡",
  "🕢",
  "🕣",
  "🕤",
  "🕥",
  "🕦",
]
export const TIMEZONE_ABBR = ""

export const LONG_DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

export const SHORT_DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export const LONG_MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const SHORT_MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export const DUMMY_EVENT: IEvent = {
  name: "",
  start: new Date(),
  duration: 0,
  category: EventCategory.Default,
  location: "",
  description: "",
  contentLink: "",
  callLink: "",
}

export const DAY_OF_THE_EVENT: Date = new Date("2021-02-17T00:00:00-05:00")
export const EVENT_END_TIME_DATE: Date = new Date("2021-02-20T00:00:00-05:00")
export const HACK_LENGTH: Number = daysApart(
  DAY_OF_THE_EVENT,
  EVENT_END_TIME_DATE
)
