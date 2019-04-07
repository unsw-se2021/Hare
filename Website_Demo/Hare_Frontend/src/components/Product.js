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

class GuestProduct extends Component { 

	render() { 
		return(
			<div>
				<Box margin="large" justify="center" align="center">
					<Box justify="between" width="100%" direction="row"> 
						<Box width="33%"  justify="center" align="start"   pad={{ left: "large" }}>
							<Link to='/upload'>
								{<Icons.LinkPrevious color={Colors.dark3} size="large" justify="left" align="left"/>}
							</Link>
						</Box> 
						<Box width="33%" justify="center" align="center"> 
							{Title("Scan Results:")}
						</Box> 
						<Box width="33%"> 
						</Box> 
					</Box> 
					<div> 
						<Text size="12pt" color={Colors.grey1}> Not sure how it works? You can find a guide </Text> 
						<Text size="12pt" color={Colors.primary}> here </Text>
					</div> 
					<Box direction="row" justify="start" width="23.5%"> 
						<Box width="10%"/>
					</Box> 
				</Box>
			</div>
		);	
	}
} 

export default withRouter(GuestProduct); 
