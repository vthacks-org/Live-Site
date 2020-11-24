import { EventCategory } from "./enums"
import { IEvent } from "./interfaces"

export const SHOW_AS_LIVE_DATES = true
export const MOBILE_BREAKPOINT_WIDTH = 992
export const ONE_MINUTE_MILLISECOND = 60000
export const ONE_DAY_MILLISECOND = 1000 * 60 * 60 * 24
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
