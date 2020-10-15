import React from 'react';

import Modal from 'react-bootstrap/Modal';

import { CLOCK_EMOJI_HOUR_LIST, CLOCK_EMOJI_THIRTY_LIST } from '../constants';
import { IEvent } from '../interfaces';

interface PropTypes {
	show: boolean;
	onHide: () => void;
	formattedTime: string;
	event: IEvent;
}

const ModalDialog: React.FC<PropTypes> = props => {
	const hours = props.event.start.getHours();
	const minutes = props.event.start.getMinutes();

	return (
		<Modal show={props.show} onHide={props.onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>
					{props.event.name} {props.event.subtitle && `- ${props.event.subtitle}`}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>
					<span role="img" aria-label="clock emoji">
						{(minutes < 30 ? CLOCK_EMOJI_HOUR_LIST : CLOCK_EMOJI_THIRTY_LIST)[hours % 12]}
					</span>
					&nbsp;
					<span>{props.formattedTime}</span>
				</p>
				{props.event.location && (
					<p>
						<span role="img" aria-label="round pushpin emoji">
							📍
						</span>
						&nbsp;
						<span>{props.event.location}</span>
					</p>
				)}
				{props.event.description && <p>{props.event.description}</p>}
			</Modal.Body>
		</Modal>
	);
};

export default ModalDialog;
