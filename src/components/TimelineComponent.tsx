import React from 'react';
import './TimelineComponent.css';

import { PropTypesDay, IEvent, ICategoryEventList } from '../interfaces';
import { EventCategoryColor } from '../enums';
import { identity, getRelativeEventTime, dateToMinutesInDay, formattedEventTime } from '../utils';
import Color from '../colors';

import ModalDialog from '../components/ModalDialog';
import { DUMMY_EVENT } from '../constants';

const minutes = 60;
const timeLabelOffset = 4;
const timeMarkerOffset = 1;
const labelSpaceVertical = 6;
const labelSpaceHorizontal = 90;
const trackSpace = 40;
const trackStartHeight = 36;
const timeLabels = Array.from(Array(24).keys()).map(i => `${i % 12 === 0 ? 12 : i % 12}${i % 24 < 12 ? 'AM' : 'PM'}`);

function processCategoryBuckets(events: IEvent[]) {
	return events.reduce((collect, event) => {
		collect[event.category] = event.category in collect ? collect[event.category].concat(event) : [event];
		return collect;
	}, identity<ICategoryEventList>({}));
}

class TimelineComponent extends React.Component<PropTypesDay> {
	scrollContainerRef: React.RefObject<HTMLDivElement>;
	state: {
		modalShow: boolean;
		modalFormattedTime: string;
		selectedEvent: IEvent;
	};

	constructor(props: PropTypesDay) {
		super(props);
		this.scrollContainerRef = React.createRef();

		this.state = {
			modalShow: false,
			modalFormattedTime: '',
			selectedEvent: DUMMY_EVENT
		};
	}

	componentDidMount() {
		if (this.scrollContainerRef.current) {
			if (this.props.showAsToday) {
				this.scrollContainerRef.current.scrollLeft = this.computeSliderPos() - labelSpaceHorizontal;
			} else {
				this.scrollContainerRef.current.scrollLeft =
					labelSpaceHorizontal * this.props.day.events[0].start.getHours();
			}
		}
	}

	computeSliderPos() {
		const now = new Date();
		return labelSpaceHorizontal * (now.getHours() + now.getMinutes() / minutes);
	}

	handleEventListItemClick(event: IEvent) {
		this.setState({
			modalShow: true,
			modalFormattedTime: formattedEventTime(event),
			selectedEvent: event
		});
	}

	render() {
		const categoryBuckets = processCategoryBuckets(this.props.day.events);

		return (
			<div id="timeline" ref={this.scrollContainerRef}>
				<ModalDialog
					show={this.state.modalShow}
					onHide={() => this.setState({ modalShow: false })}
					formattedTime={this.state.modalFormattedTime}
					event={this.state.selectedEvent}
				/>
				<div id="timeline-label-container">
					{timeLabels.map((label, index) => (
						<div key={`timeline-label-${index}`}>
							<p
								className="timeline-label"
								style={{
									top: labelSpaceVertical,
									left: index * labelSpaceHorizontal + timeLabelOffset,
									width: labelSpaceHorizontal
								}}
							>
								{label}
							</p>
							<div
								className="timeline-label-marker"
								style={{ left: index * labelSpaceHorizontal - timeMarkerOffset }}
							/>
						</div>
					))}
				</div>
				{this.props.showAsToday && (
					<div
						id="timeline-slider"
						style={{
							left: this.computeSliderPos()
						}}
					>
						<svg className="triangle-pointer top" fill="#ff7f7f" viewBox="0 0 100 100">
							<path d="M0 0 L50 100 L100 0 Z"></path>
						</svg>
						<svg className="triangle-pointer bottom" fill="#ff7f7f" viewBox="0 0 100 100">
							<path d="M0 100 L50 2 L100 100 Z"></path>
						</svg>
					</div>
				)}
				<div id="timeline-tracks-container">
					{Object.keys(categoryBuckets).map((activityKey, activityIndex) => (
						<div key={`timeline-track-${activityKey}-container`}>
							{categoryBuckets[activityKey].map((event, eventIndex) => (
								<div
									key={`timeline-track-${activityKey}-${eventIndex}`}
									className={`timeline-track-item ${
										this.props.showAsToday
											? getRelativeEventTime(event)
											: this.props.relativeDayTime
									}`}
									style={{
										width: (labelSpaceHorizontal / minutes) * event.duration,
										left: (labelSpaceHorizontal / minutes) * dateToMinutesInDay(event.start),
										top: trackStartHeight + trackSpace * activityIndex
									}}
									onClick={() => this.handleEventListItemClick(event)}
								>
									<p>{event.name}</p>
									<div
										key={`timeline-track-${activityKey}-${eventIndex}`}
										className="timeline-track-line"
										style={{
											background: EventCategoryColor[activityKey] || Color.Overflow
										}}
									>
										{['left', 'right'].map(lineEnd => (
											<svg
												key={`timeline-line-${lineEnd}`}
												className={`timeline-track-line-end-${lineEnd}`}
												height="10"
												width="10"
											>
												<circle
													className={`timeline-track-line-end-${lineEnd}`}
													cx="5"
													cy="5"
													r="5"
													fill={EventCategoryColor[activityKey] || Color.Overflow}
												/>
											</svg>
										))}
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default TimelineComponent;
