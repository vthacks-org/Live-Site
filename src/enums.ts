export enum EventCategory {
  Default = "default",
  Workshop1 = "workshop1",
  Workshop2 = "workshop2",
  Workshop3 = "workshop3",
  Hacker = "hacker",
  UX = "ux",
}

export const EventCategoryColor: {
  [category: string]: string
} = {
  [EventCategory.Default]: "grey",
  [EventCategory.Workshop1]: "purple",
  [EventCategory.Workshop2]: "purple",
  [EventCategory.Workshop3]: "purple",
  [EventCategory.UX]: "lightpink",
  [EventCategory.Hacker]: "lightgreen",
}

export enum RoutePath {
  Home = "/",
  Workshop = "/workshops",
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
