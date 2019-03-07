import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu, Paragraph } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';

class UploadPage extends Component { 

	render() { 
		return(
			<div>
				<h1>Upload Image</h1>
				<br />
				<Box alignSelf="center" border={{ color:"dark-3", size: "large"}} pad="medium">
					<Icons.Camera alignSelf="center" size="xlarge" />
				</Box>
				<br />
				<Box alignSelf="center" border={{ color:"dark-3", size: "large"}} pad="medium">
					<Icons.StatusInfo alignSelf="center" size="large"/>
					<br />
					<Paragraph margin="small">
						This page is currently under construction. If
						you are testing the "Upload then view Product" 
						feature, continue by following the link below:
					</Paragraph>
					<br />
					<Link to="/product">Submit Image</Link>
				</Box>
			</div>
		);	
	}
} 

export default UploadPage; 
