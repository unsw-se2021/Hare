import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu } from 'grommet';
import * as Icons from 'grommet-icons';

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
				<strong>TemporaryAppName</strong>
			</Heading>
			{
			}
			<Box direction="row">
				<Menu id='help_button'
					items={[
						{ label: '1' },
						{ label: '2' },
						{ label: '3' }
					]}
					icon={<Icons.Help color='black'/>}	 
					alignSelf='end'/>
				<Menu id='user_button'
					items={
						[{label: 'Log in', onClick: () => {console.log("LOG IN REQUESTED")}}]}
					icon={<Icons.Apps color='black'/>}/>
			</Box>
		</Box>
		);
	}
} 
export default Navbar; 
