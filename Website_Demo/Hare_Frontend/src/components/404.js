import React, { Component } from 'react'; 
import { 
	Grommet, 
	grommet, 
	DropButton,
	Button, 
	Box, 
	Heading, 
	Menu, 
	Paragraph, 
	Carousel, 
	Accordion, 
	AccordionPanel, 
	Text, 
	Image, 
	Distribution
} from 'grommet';

import * as Icons from 'grommet-icons';
import { 
	withRouter, 
	Route, 
	Link, 
	Router, 
	BrowserRouter 
} from 'react-router-dom';

import Colors from './Color'; 


const Title = (contents) => { 
	return(
		<Text size="36pt" color={Colors.dark3}> 
			{contents}
		</Text> 
	); 
} 

const subTitle = (contents, size) => {
	let ptsize = `${size}pt`
	return( 
		<Text size={ptsize} color={Colors.grey1}> 
			{contents}
		</Text> 
	); 
} 

// TODO: 
const cameraWindow = () => { 
	return( 
		<Box background={Colors.grey1} pad="10%">
			<Icons.Camera color={Colors.grey3} size="large"/>
		</Box> 
	); 
} 

// TODO: 

const horizontalSpacer = (amt) => { 
	return( 
		<Box width="100%" height={amt}> 
		</Box> 
	); 
} 

class NoPage extends Component { 

	render() { 
		return(
			<div>
				<Box margin="10%" justify="center" align="center">
					{Title("There's nothing to see here\n):")}
					<Text size="1000%" color={Colors.dark3}> ??? </Text>
					<Link to='/' style={{ textDecoration: 'none' }}>
						<Text size="36pt" color={Colors.primary}>Get me out of here</Text>
					</Link>
				</Box>
			</div>
		);	
	}
} 

export default withRouter(NoPage); 
