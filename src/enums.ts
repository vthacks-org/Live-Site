export enum EventCategory {
  Default = "default",
  Workshop = "workshop",
  Hacker = "hacker",
  UX = "ux",
  Organizer = "organizer",
  Sponsor = "sponsor",
}

export const EventCategoryColor: {
  [category: string]: string
} = {
  [EventCategory.Default]: "grey",
  [EventCategory.Workshop]: "deepskyblue",
  [EventCategory.UX]: "#ff47c5",
  [EventCategory.Hacker]: "#f89b6a",
  [EventCategory.Organizer]: "#ff3333",
  [EventCategory.Sponsor]: "#ffff42",
}

export enum RoutePath {
  Schedule = "/",
  Workshops = "/workshops",
  Resources = "/resources",
  Submission_Guidelines = "/submission_guidelines",
  UX_Events = "/ux_events",
  Prizes = "/prizes",
  Getting_Started = "/getting_started",
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
