import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu, Paragraph, Carousel, Accordion, AccordionPanel, Text, Image } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';


const bullet = (colour, text) => {
	return	<Box direction="row" alignContent="center" align="center" gap="medium">
				<Box width="10pt" height="10pt" round="full" background={colour}></Box>
				{text}
			</Box>
}

class Product extends Component { 

	render() { 
		return(
			<div>
				<Box direction="row" justify="between" align="center" alignContent="center">
					<Heading>Product</Heading>
				</Box>
				<Box direction="row">
					<Box width="50%" gap="small">
						<Carousel fill={true} width="small" height="small">
							<Image cover="fit" src="https://media.fooducate.com/comments/images/527AA37C-0C96-B54A-42FF-AE0D93A15C2C.jpeg"/>
							<Image cover="fit" src="https://images-na.ssl-images-amazon.com/images/I/71mgm8fudZL._SY355_.jpg"/>
							<Image cover="fit" src="https://scontent.fsyd2-1.fna.fbcdn.net/v/t1.0-9/13557810_157211808029772_7403455430232334858_n.jpg?_nc_cat=107&_nc_ht=scontent.fsyd2-1.fna&oh=55e50201ad36fe30cb1b381884753396&oe=5D207E26"/>
						</Carousel>
					</Box>
					<Box width="50%" gap="small">
						<Box margin="medium" round="small">
							{bullet("rgb(100,30,10)", <Text>No hazardous substances</Text>)}
							{bullet("rgb(210,200,10)", <Text>No allergens</Text>)}
							{bullet("rgb(10,30,100)", <Text>No preseratives</Text>)}
						</Box>
					</Box>
				</Box>
				<Accordion width="100%">
					<AccordionPanel label="Health Hazards">
						<Text>No content</Text>
					</AccordionPanel>
					<AccordionPanel label="Allergens">
						<Text>No content</Text>
					</AccordionPanel>
					<AccordionPanel label="Preservatives">
						<Text>No content</Text>
					</AccordionPanel>
				</Accordion>
			</div>
		);	
	}
} 

export default Product; 
