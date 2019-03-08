import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Button, Heading, Menu } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'; 
import Home from './Home'; 

class Navbar extends Component { 

	render() { 
		return(
			<Box
				tag='header' // Tag that appears in rendered HTML
			background='white' // Colour of fill 
			align='center'
			pad='small' // Internal padding | --> contents <-- |
			elevation='xsmall' // Drop shadow "distance" above ground
			justify='between' // Pushes items inside of box to both sides
			direction='row' // Stretch sideways instead of upwards 
			flex={false}>

			<Heading level={3} margin='none'>
				DefaultAppName
			</Heading>
			{
			}
			<Router>
				<Box direction="row">
					<Link to='/help'>
						<Button
							icon={<Icons.Help color='black' />}
							onClick={() => {}}
							alignSelf='end'
						/>	
					</Link>
					<Menu id='user_button'
						items={
							[
								{ label: "You aren't logged in", disabled: true},
								{ label: 'Register', onClick: () => { /* ROUTE TO REGISTER */ } },
								{ label: 'Log in', onClick: () => { /*ROUTE TO LOG IN */ } }
							]
						}

						icon={<Icons.ContactInfo color='black'/>} 
					/>
				</Box>
			</Router> 
		</Box>
		);
		}
		} 
		export default Navbar; 
