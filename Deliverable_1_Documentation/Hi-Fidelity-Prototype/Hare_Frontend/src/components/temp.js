// Main container for website application. 
import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu } from 'grommet';
import * as Icons from 'grommet-icons';
import Theme from './Theme.js'; 
import View from './View.js';
import Auth from './Authenticate.js';
import UserPage from './User.js';

class Navbar extends Component { 
	
	render() { 
		return(
			<Box
			tag='header' // Tag that appears in rendered HTML
			background='neutral-3' // Colour of fill 
			align='center'
			pad='small' // Internal padding | --> contents <-- |
			elevation='xsmall' // Drop shadow "distance" above ground
			justify='between' // Pushes items inside of box to both sides
			direction='row' // Stretch sideways instead of upwards 
			flex={false}>

			<Heading level={3} margin='none'>
				<strong>App</strong>
			</Heading>
			{// THESE NEEDS TO BECOME SEPARATE CLASSES 
			}
			<Box direction="row">
				<Menu id='help_button'
					items={[
						{	label: '1', 
							onClick: changeView(1)},
						{ label: '2' },
						{ label: '3' }
					]}
					icon={<Icons.Help color='white'/>}	 
					alignSelf='end'/>
				<Menu id='user_button'
					items={
						[{label: 'Log in', onClick: () => {console.log("LOG IN REQUESTED")}}]}
					icon={<Icons.Apps color='white'/>}/>
			</Box>
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
			background='white-2'>
			<Box fill={true} id='body=root'/> 
			<View/>
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
				background='neutral-3'
				pad='small'
				justify='between'
				alignContent='end'>
				<code>FOOTER CONTENT</code>
				<code>FOOTER</code>
			</Box>
		);
	}
}; 

class App extends Component { 
	render() { 
		return(
			<Grommet theme={grommet} full={true}>
				<Box 
					background-image="url(http://images7.memedroid.com/images/UPLOADED252/585e47b2e5c2a.jpeg)" 
					fill={true} 
					alignContent="between">
					<Navbar />
					<Body />
					<Footer />
				</Box>
			</Grommet>
		); 
	}
} 

export default App; 
