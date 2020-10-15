import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const ContactView: React.FC = () => {
	return (
		<Container id="contact-view" fluid>
			<Col>
				<h2>General Inquiries</h2>
				<h4>Paul Lee - Organizer</h4>
				<p>(519) - 410 - 8070</p>
				<h4>Hamza Basrai - Organizer</h4>
				<p>(647) - 332 - 7665</p>
				<b>*For life threatening emergencies please call 911</b>
			</Col>
		</Container>
	);
};

export default ContactView;
