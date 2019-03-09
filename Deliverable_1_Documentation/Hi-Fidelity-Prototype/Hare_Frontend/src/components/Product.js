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
					<Box width="50%">
						<Carousel width="large">
							<Box width="large" height="large" background="light-3">
								<Text>Product photo 1</Text>
							</Box>
							<Box width="large" height="large" background="light-3">
								<Text>Product photo 2</Text>
							</Box>
							<Box width="large" height="large" background="light-3">
								<Text>Product photo 3</Text>
							</Box>
						</Carousel>
					</Box>
					<Box width="50%" gap="small" direction="row" justify="center" align="center" alignContent="center">
						<Box margin="medium" gap="medium" round="small" background="light-3" pad="small">
							{bullet("dark-2", <Text>No hazardous substances</Text>)}
							{bullet("dark-3", <Text>No allergens</Text>)}
							{bullet("dark-4", <Text>No preseratives</Text>)}
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
