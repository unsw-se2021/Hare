import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu } from 'grommet';
import * as Icons from 'grommet-icons';
  

class Footer extends Component { 
	render() { 
		return(
			<Box 
				tag='footer'
				direction='row'
				flex={false}
				background='white'
				pad='small'
				justify='between'
				alignContent='end'>
				<small>FOOTER</small><small>CONTENT</small>
			</Box>
		);
	}
}; 

export default Footer; 
