export enum EventCategory {
  Default = "default",
  Workshop = "workshop",
  Hacker = "hacker",
  UX = "ux",
}

export const EventCategoryColor: {
  [category: string]: string
} = {
  [EventCategory.Default]: "grey",
  [EventCategory.Workshop]: "purple",
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
