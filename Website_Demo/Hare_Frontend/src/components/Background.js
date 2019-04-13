import React, { Component } from "react";
import { Grommet, grommet, Box, Button, Heading, Menu, Paragraph, Image, Text} from "grommet";
import * as Icons from "grommet-icons";
import { Route, Link, Router, BrowserRouter } from "react-router-dom";

import bgimg from './homebg.png' 
//import Navbar from '../page_elements/Navbar';
const imgMyimageexample = bgimg; 
const bgstyle  = {
	postion: 'relative',	
	width: '100%',
	height: '100%',
	backgroundImage: `url(${imgMyimageexample})`,
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
};


class Home extends Component {
	render() {
		return (
			<div  style={bgstyle} >
			</div> 
		);
	}
}

export default Home;
