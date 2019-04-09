import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Button, Heading, Menu, Paragraph, Text } from 'grommet';
import * as Icons from 'grommet-icons';
import { Switch, BrowserRouter as Router, browserHistory, Redirect, withRouter, Link  } from 'react-router-dom';
import Colors from './Color';
import Home from './Home'; 
import AuthService from './AuthService';

const uploadTitle = (contents) => { 
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
const horizontalSpacer = (amt) => { 
	return( 
		<Box width="100%" height={amt}> 
		</Box> 
	); 
} 



class ProfilePage extends Component { 

	constructor() {
		super(); 

	} 

	// MAIN VIEW
	render() { 
		return(
			<Box margin="large" justify="center" align="center">

			</Box>
		);	
	}
}


export default withRouter(ProfilePage); 
