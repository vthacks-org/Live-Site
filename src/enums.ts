export enum EventCategory {
  Default = "default",
  Workshop = "workshop",
  Hacker = "hacker",
  UX = "ux",
  Organizer = "organizer",
}

export const EventCategoryColor: {
  [category: string]: string
} = {
  [EventCategory.Default]: "grey",
  [EventCategory.Workshop]: "deepskyblue",
  [EventCategory.UX]: "#ff47c5",
  [EventCategory.Hacker]: "#30ff5d",
  [EventCategory.Organizer]: "#ff483b",
}

export enum RoutePath {
  Schedule = "/",
  Workshops = "/workshops",
  Resources = "/resources",
  Submission_Guidelines = "/submission_guidelines",
  UX_Events = "/ux_events",
  Prizes = "/prizes",
}

export enum RelativeTime {
  Past = "past",
  Present = "present",
  Future = "future",
}

export enum EventListener {
  Resize = "resize",
}

export enum SortKeys {
  Ascending = "asc",
  Descending = "desc",
}
