import React, { Component } from "react";
import { Grommet, grommet, Box, Button, Heading, Menu, Paragraph, Image, Text} from "grommet";
import * as Icons from "grommet-icons";
import { Route, Link, Router, BrowserRouter, NavLink } from "react-router-dom";

import Colors from '../Color.js'
import bgimg from '../homebg.png' 
//import Navbar from '../page_elements/Navbar';

const HomeTitle = (contents) => { 
	return( 
		<Text size="36pt" color={Colors.dark3}> 
			{contents} 
		</Text> 
	); 
} 

const Spacer = () => { 
	return(
		<div height="20%">
			<br/>
		</div>
	);
}

const UploadButton = () => { 
	return(
		<Box alignSelf="center" background={Colors.primary} width="300px" height="50px" justify="center" align="center"> 
			<NavLink to='/upload' style={{ textDecoration: 'none' }}> 
					<Text size="16pt" color={Colors.grey3}> Scan something! </Text> 
			</NavLink> 
		</Box>
	); 
} 

const imgMyimageexample = bgimg; 
const divStyle = {
  width: '100%',
  height: '100%',
  backgroundImage: `url(${imgMyimageexample})`,
  backgroundSize: 'cover',
	zIndex: '1'
};


class Home extends Component {
	render() {
		return (
			<Box direction="row" align="center" justify="center" fill={true} flex={true} background={Colors.grey3}>
				<Box direction="column" alignContent="center">
				{HomeTitle("Information about product ingredients")}
				<Spacer/> 
				{UploadButton()} 
				</Box>
			</Box>
		);
	}
}

export default Home;
