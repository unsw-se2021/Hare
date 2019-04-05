import React, { Component } from 'react'; 
import { Grommet, grommet, Button, Box, Heading, Menu, Paragraph} from 'grommet';
import * as Icons from 'grommet-icons';

class Footer extends Component { 
	render() { 
		return(
			<Box 
				tag='footer'
				direction='row'
				background='light-3'
				elevation='medium'
				justify='between'
				alignContent='center'>
				<Button icon={<Icons.Github/>} href="https://github.com/unsw-se2021/HARE" />
				<Paragraph size="small" color="dark-6" width="xsmall">Control Alt Defeat, SENG2021 &nbsp;</Paragraph> 
			</Box>
		);
	}
}; 

export default Footer; 
