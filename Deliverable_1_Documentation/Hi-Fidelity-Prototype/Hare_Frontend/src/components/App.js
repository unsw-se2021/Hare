// Main container for website application. 
import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu } from 'grommet';
import * as Icons from 'grommet-icons';
import Theme from './Theme.js'; 
import View from './View.js'; 

class Navbar extends Component { 
	render() { 
		return(
			<Box
				tag='header' // Tag that appears in rendered HTML
				background='neutral-3' // Colour of fill 
				pad='small' // Internal padding | --> contents <-- |
				elevation='xsmall' // Drop shadow "distance" above ground
				justify='between' // Pushes items inside of box to both sides
				direction='row' // Stretch sideways instead of upwards 
				flex={false}
			>
			<Heading level={3} margin='none'>
				<strong>App</strong>
			</Heading>
			<Menu
				items={
					[
						{
							label: 'Logout',
							href: '#'
						}
					]
				}
				icon={
					<Icons.Apps color='white'/>
				}
			/>
		</Box>
		);
	}
} 

class Body extends Component { 
	render() { 
		return(
			<Box 
				flex={true}
				id='Body'
				background='grey'
			>
				BODY CONTENT
			</Box>	
		);
	}
}  

class Footer extends Component { 
	render() { 
		return(
			<Box
				tag='footer'
				direction='row'
				flex={false}
			>
				FOOTER CONTENT
			</Box>
		);
	}
}; 

class App extends Component { 
	render() { 
		return(
			<Grommet theme={grommet} full={true}>
				<Box fill={true} alignContent="between">
					<Navbar />
					<Body />
					<Footer />
				</Box>
			</Grommet>
		); 
	}
} 

export default App; 
