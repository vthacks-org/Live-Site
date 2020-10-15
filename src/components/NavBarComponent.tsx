import React from 'react';
import './NavBarComponent.css';
import '../App.css';
import '../index.css';

import { RoutePath } from '../enums';

import { Link } from 'gatsby';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const ROUTES_WITH_TITLES = [{
	title: 'Schedule',
	path: '/'
},
{
	title: 'Information',
	path: '/info'
},
{
	title: 'Challenges',
	path: '/challenges'
},
{
	title: 'Workshops',
	path: '/workshops'
}];

class NavBarComponent extends React.Component {
	state: any;

	constructor(props: any) {
		super(props);

		this.state = {
			expanded: false
		};

		this.toggle = this.toggle.bind(this);
		this.collapse = this.collapse.bind(this);
	}

	toggle() {
		this.setState({ expanded: !this.state.expanded });
	}

	collapse() {
		this.setState({ expanded: false });
	}

	render() {
		return (
			<>
				<div
					id="navbar-hidden-overlay"
					style={{
						display: this.state.expanded ? 'block' : 'none'
					}}
					onClick={this.collapse}
				/>
				<Navbar id="navbar-main" expanded={this.state.expanded} bg="dark" variant="dark" expand="lg">
					<Navbar.Brand id="brand">
						<img src="./logo512.png" alt="" />
						<Link id="wordmark" to={RoutePath.Home} onClick={this.collapse}>
							VTHacks<span>8</span>
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" onClick={this.toggle} style={{ color: 'white' }} />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							{ROUTES_WITH_TITLES.map((routeItem, index) => (
								<Link
									key={`route-path-link-${index}`}
									to={Array.isArray(routeItem.path) ? routeItem.path[0] : routeItem.path}
									onClick={this.collapse}
								>
									{routeItem.title}
								</Link>
							))}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</>
		);
	}
}

export default NavBarComponent;
