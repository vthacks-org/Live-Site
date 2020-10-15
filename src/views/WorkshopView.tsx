import React from 'react';
import './WorkshopView.css';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import { EventCategory, RelativeTime } from '../enums';
import { firstDay, secondDay, thirdDay } from '../data/schedule';

import EventListItem from '../components/EventListItem';
import ModalDialog from '../components/ModalDialog';
import { formattedEventTime } from '../utils';
import { DUMMY_EVENT } from '../constants';
import { IEvent } from '../interfaces';

const days = [firstDay, secondDay, thirdDay];

const WorkshopView: React.FC = () => {
	const [show, setShow] = React.useState(false);
	const [formattedTime, setFormattedTime] = React.useState('');
	const [workshop, setWorkshop] = React.useState(DUMMY_EVENT);

	const filterWorkshops = (events: IEvent[]) =>
		events.filter(event => [EventCategory.Workshop1, EventCategory.Workshop2].includes(event.category));

	return (
		<Container id="workshop-view" fluid>
			<Col>
				{
					<div>
						<ModalDialog
							show={show}
							onHide={() => setShow(false)}
							formattedTime={formattedTime}
							event={workshop}
						/>
						{days.map(
							(day, index) =>
								filterWorkshops(day.events).length !== 0 && (
									<div key={`workshop-day-${index}`} className="workshop-day">
										<h5>Day {index + 1}</h5>
										<div className="workshops">
											{filterWorkshops(day.events).map((event, index) => (
												<div
													className="event-item-container"
													key={`event-list-item-${index}`}
													onClick={() => {
														setShow(true);
														setFormattedTime(formattedEventTime(event));
														setWorkshop(event);
													}}
												>
													<EventListItem
														event={event}
														showAsToday={false}
														relativeDayTime={RelativeTime.Future}
													/>
												</div>
											))}
										</div>
									</div>
								)
						)}
					</div>
				}
			</Col>
		</Container>
	);
};

export default WorkshopView;
