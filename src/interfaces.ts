import { EventCategory, RoutePath, RelativeTime } from './enums';

export interface IEvent {
	name: string;
	subtitle?: string;
	start: Date;
	duration: number;
	category: EventCategory;
	location: string;
	description: string;
}

export interface IEventDay {
	index: number;
	title: string;
	longTitle?: string;
	date: Date;
	events: IEvent[];
}

export interface ICategoryEventList {
	[category: string]: IEvent[];
}

export interface PropTypesDay {
	day: IEventDay;
	showAsToday: boolean;
	relativeDayTime: RelativeTime;
}

export interface IRouteItem {
	path: RoutePath | RoutePath[];
	title: string;
	component: React.FC<{}>;
}
