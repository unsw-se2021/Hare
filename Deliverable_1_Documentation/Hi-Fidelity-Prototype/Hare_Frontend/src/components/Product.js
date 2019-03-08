import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu, Paragraph } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';


class Product extends Component { 

	render() { 
		return(
			<div>
				<h1>Results</h1>
				<br />
				<Box direction="row" fill={true}>
					<Box pad="small" width="50%" height="auto" background="red">
						<Box fill={true} background="dark-3"> IMAGE <br /> RECOMMEND: Carousel</Box>
					</Box>
					<Box pad="small" fill={true} width="50%" height="auto" background="blue">
						Ingredients here
						RECOMMEND: Accordion
						<Box background="dark-3" width="100%" height="30px">
							RECOMMEND: Drop w/ Information
						</Box>
					</Box>
				</Box>
				<br />
				<Paragraph margin="small">
					This page is currently under construction
				</Paragraph>
				<br />
			</div>
		);	
	}
} 

export default Product; 
