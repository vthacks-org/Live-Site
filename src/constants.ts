import { RoutePath, EventCategory } from './enums';
import { IRouteItem, IEvent } from './interfaces';

import InfoView from './views/InfoView';
import WorkshopView from './views/WorkshopView';
import MapView from './views/MapView';
import FoodMenuView from './views/FoodMenuView';
import ContactView from './views/ContactView';
import ChallengeView from './views/ChallengeView';

const SHOW_AS_LIVE_DATES = true;
const MOBILE_BREAKPOINT_WIDTH = 992;
const ONE_MINUTE_MILLISECOND = 60000;
const EVENT_LIST_ITEM_HEIGHT = 72;
const CLOCK_EMOJI_HOUR_LIST = ['🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚'];
const CLOCK_EMOJI_THIRTY_LIST = ['🕧', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦'];

const DUMMY_EVENT: IEvent = {
	name: '',
	start: new Date(),
	duration: 0,
	category: EventCategory.Default,
	location: '',
	description: ''
};

export {
	SHOW_AS_LIVE_DATES,
	MOBILE_BREAKPOINT_WIDTH,
	ONE_MINUTE_MILLISECOND,
	EVENT_LIST_ITEM_HEIGHT,
	CLOCK_EMOJI_HOUR_LIST,
	CLOCK_EMOJI_THIRTY_LIST,
	DUMMY_EVENT
};
