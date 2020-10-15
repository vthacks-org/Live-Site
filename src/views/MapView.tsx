import React from 'react';
import './MapView.css';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const floorImages = [
	require('../assets/images/floor1.png'),
	require('../assets/images/floor2.png'),
	require('../assets/images/floor3.png'),
	require('../assets/images/floor4.png'),
	require('../assets/images/floor5.png')
];

const MapView: React.FC = () => {
	const [button, setButton] = React.useState(0);
	const [image, setImage] = React.useState(floorImages[0]);

	const handleClick = (index: number) => {
		setButton(index);
		setImage(floorImages[index]);
	};

	return (
		<Container id="map-view" fluid>
			<Col>
				<h2>Learning Crossroads (CRX)</h2>
				<h4>100 Louis-Pasteur Private, Ottawa, ON K1N 9N3</h4>
				<div className="d-flex flex-column">
					<ButtonGroup className="button-group">
						{floorImages.map((_, index) => (
							<Button
								key={`button-${index}`}
								onClick={() => handleClick(index)}
								variant={index === button ? 'dark' : 'light'}
							>
								{index + 1}
							</Button>
						))}
					</ButtonGroup>
				</div>
				<div className="floor-layouts">
					<img src={image} alt={`Floor ${button + 1} layout`} />
				</div>
			</Col>
		</Container>
	);
};

export default MapView;
