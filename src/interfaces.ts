import { EventCategory, RoutePath, RelativeTime } from "./enums"

export interface IEvent {
  name: string
  display: boolean
  subtitle?: string
  start: Date
  duration: number
  category: EventCategory
  location?: string
  description: string
  contentLink: string
  callLink: string
}

export interface Markdown {
  content: string
  data: {
    title: string
    display: boolean
    templateKey: string
    shouldDisplayTitle: boolean
  }
}

export interface IEventDay {
  index: number
  title: string
  longTitle?: string
  date: Date
  events: IEvent[]
}

export interface ICategoryEventList {
  [category: string]: IEvent[]
}

export interface PropTypesDay {
  day: IEventDay
  showAsToday: boolean
  relativeDayTime: RelativeTime
}
