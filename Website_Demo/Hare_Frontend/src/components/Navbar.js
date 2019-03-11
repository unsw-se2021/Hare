import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Button, Heading, Menu } from 'grommet';
import * as Icons from 'grommet-icons';
import { Redirect, Route, Link, Router, withRouter } from 'react-router-dom';
import Help from './Help'; 
import Home from './Home'; 
import Login from './Login'; 
import Register from './Register'; 

class Navbar extends Component { 

	navigateToHome = () => { 
		this.props.history.push('/home'); 
	} 

	navigateToHelp = () => {
		this.props.history.push('/help');
	}

	navigateToLogin = () => { 
		this.props.history.push('/login'); 
	} 

	navigateToRegister = () => { 
		this.props.history.push('/register'); 
	} 

	render() { 

		return(
			<Box
				tag='header' // Tag that appears in rendered HTML
			background='light-3' // Colour of fill 
			align='center'
			pad='small' // Internal padding | --> contents <-- |
			elevation='medium' // Drop shadow "distance" above ground
			justify='between' // Pushes items inside of box to both sides
			direction='row' // Stretch sideways instead of upwards 
			flex={false}>
			<Link to='/home' style={{ textDecoration: 'none' }}> 	
				<Box direction="row" gap="small" width="medium" align="center" alignContent="center"> 
					<Icons.Image />
					<h3>Hare</h3>				
				</Box>
			</Link>
			<Box direction="row">
				<Button icon={<Icons.CircleQuestion />} onClick={() => { this.navigateToHelp(); } } />
				<Menu id='user_button'
					items={
						[
							{ label: "You aren't logged in", disabled: true},
							{ label: 'Register', onClick: () => { this.navigateToRegister(); } },
							{ label: 'Log in', onClick: () => { this.navigateToLogin(); } }
						]
					}

					icon={<Icons.ContactInfo color='black'/>} 
				/>
			</Box>
		</Box>
		);
	}
} 
export default withRouter(Navbar); 
