import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu, Paragraph } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';


class Home extends Component { 

	render() { 
		return(
			<div>
				<h1>Homepage</h1>
				<br />
				<Box alignSelf="center" border={{ color:"dark-3", size: "large"}} pad="medium">
					<Icons.StatusInfo alignSelf="center" size="large"/>
					<br />
					<Paragraph margin="small">
						This page is currently under construction
						If you are here to test the "Upload" feature,
						follow this link: 
					</Paragraph>
					<br />
					<Link to="/upload">Upload Image</Link>
				</Box>
			</div>
		);	
	}
} 

export default Home; 
