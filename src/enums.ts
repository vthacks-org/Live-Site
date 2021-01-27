export enum EventCategory {
  Default = "default",
  Food = "food",
  Workshop1 = "workshop1",
  Workshop2 = "workshop2",
  Activity = "activity",
  Career = "career",
  Hacker = "hacker",
  UX = "ux",
}

export const EventCategoryColor: {
  [category: string]: string
} = {
  [EventCategory.Default]: "grey",
  [EventCategory.Food]: "deepskyblue",
  [EventCategory.Workshop1]: "purple",
  [EventCategory.Workshop2]: "purple",
  [EventCategory.Activity]: "lightpink",
  [EventCategory.Career]: "indianred",
  [EventCategory.Hacker]: "lightgreen",
  // navy
}

export enum RoutePath {
  Home = "/",
  Workshop = "/workshops",
}

export enum Location {
  None = "",
  CareerFair = "1st floor",
  WorkshopC308 = "Workshop Room C308",
  WorkshopC309 = "Workshop Room C309",
  Staging = "Staging - First Floor Classroom",
  Lobby = "Lobby",
  REST = "REST Room - 5th floor",
  UCU = "UCU - follow guides to different building",
  Food = "Food Room C307",
  Demo = "C140",
  Canal = "Rideau Canal",
  CRX = "CRX",
}

export enum RelativeTime {
  Past = "past",
  Present = "present",
  Future = "future",
}

export enum EventListener {
  Resize = "resize",
}
