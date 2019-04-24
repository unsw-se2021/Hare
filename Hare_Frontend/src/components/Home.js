//
import React, { Component } from "react";
import { Grommet, grommet, Box, Button, Heading, Menu, Paragraph, Image, Text} from "grommet";
import * as Icons from "grommet-icons";
import { Route, Link, Router, BrowserRouter, NavLink } from "react-router-dom";

// IMPORT: Style components 
import Style from './styles/Style';
import Colors from './styles/Color.js';
import bgimg from './styles/homebg.png';

// IMPORT: React pages 
import Upload from './Upload';

const Spacer = () => { 
	return(
		<div height="20%">
			<br/>
		</div>
	);
}

class Home extends Component {

	UploadButton = () => { 
		return(
			<Box 
			alignSelf="center" 
			background={Colors.primary} 
			width="300px" 
			height="50px" 
			justify="center" 
			align="center"> 
				<NavLink to='/upload' style={{ textDecoration: 'none' }}> 
						<Text size="16pt" color={Colors.grey3}> Scan something! </Text> 
				</NavLink> 
			</Box>
		); 
	}
	render() {
		return (
			<Box 
			direction="row" 
			align="center" 
			justify="center" 
			fill={true} 
			flex={true} 
			style={{
				backgroundImage: "url("+bgimg+")",
				backgroundSize: 'cover',
			}}
			>
				<Box direction="column" alignContent="center">
				{Style.Title("Information about product ingredients", Colors.grey3)}
				<Spacer/> 
				{this.UploadButton()} 
				</Box>
			</Box>
		);
	}
}

export default Home;
