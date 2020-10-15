import React from 'react';
import './EventListComponent.css';

import { EVENT_LIST_ITEM_HEIGHT, DUMMY_EVENT } from '../constants';
import { PropTypesDay, IEvent } from '../interfaces';
import { dateToMinutesInDay, getRelativeEventTime, formattedEventTime } from '../utils';

import EventListItem from './EventListItem';
import ModalDialog from '../components/ModalDialog';
import { RelativeTime } from '../enums';

function sortEvents(event1: IEvent, event2: IEvent) {
	return event1.start.getTime() - event2.start.getTime();
}

class EventListComponent extends React.Component<PropTypesDay> {
	scrollContainerRef: React.RefObject<HTMLDivElement>;
	state: {
		modalShow: boolean;
		modalFormattedTime: string;
		selectedEvent: IEvent;
		events: IEvent[];
	};

	constructor(props: PropTypesDay) {
		super(props);
		this.scrollContainerRef = React.createRef();

		const events = this.props.day.events;
		const past = events.filter(event => this.relativeTime(event) === RelativeTime.Past).sort(sortEvents);
		const presentAndFuture = events
			.filter(event => this.relativeTime(event) !== RelativeTime.Past)
			.sort(sortEvents);
		const filteredAndSortedEvents = past.concat(presentAndFuture);

		this.state = {
			modalShow: false,
			modalFormattedTime: '',
			selectedEvent: DUMMY_EVENT,
			events: filteredAndSortedEvents
		};
	}

	componentDidMount() {
		if (this.props.showAsToday) {
			this.updateScroll();
		}
	}

	updateScroll() {
		window.requestAnimationFrame(() => {
			if (this.scrollContainerRef.current) {
				this.scrollContainerRef.current.scrollTop =
					this.computeFirstActiveEventIndex(this.state.events) * EVENT_LIST_ITEM_HEIGHT;
			}
		});
	}

	handleEventListItemClick(event: IEvent) {
		this.setState({
			modalShow: true,
			modalFormattedTime: formattedEventTime(event),
			selectedEvent: event
		});
	}

	computeFirstActiveEventIndex(events: IEvent[]) {
		const now = dateToMinutesInDay(new Date());
		let i = 0;
		for (; i < events.length; ++i) {
			const event = events[i];
			const start = dateToMinutesInDay(event.start);
			const end = start + event.duration;

			if (now < end) {
				break;
			}
		}
		return i;
	}

	relativeTime(event: IEvent) {
		return this.props.showAsToday ? getRelativeEventTime(event) : this.props.relativeDayTime;
	}

	render() {
		return (
			<div id="event-list" ref={this.scrollContainerRef}>
				<ModalDialog
					show={this.state.modalShow}
					onHide={() => this.setState({ modalShow: false })}
					formattedTime={this.state.modalFormattedTime}
					event={this.state.selectedEvent}
				/>
				{this.state.events.map((event, index) => (
					<div key={`event-list-item-${index}`} onClick={() => this.handleEventListItemClick(event)}>
						<EventListItem
							event={event}
							showAsToday={this.props.showAsToday}
							relativeDayTime={this.relativeTime(event)}
						/>
					</div>
				))}
			</div>
		);
	}
}

export default EventListComponent;
