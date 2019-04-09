import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Button, Heading, Menu, Paragraph, Text } from 'grommet';
import * as Icons from 'grommet-icons';
import { Switch, BrowserRouter as Router, browserHistory, Redirect, withRouter, Link  } from 'react-router-dom';
import Colors from './Color';
import Home from './pages/Home'; 
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
		this.state = {}; 
		let data = JSON.parse(localStorage.getItem('userdata'));
		console.log(data); 
		this.state.username = data.username;
		this.state.productlist = data.products;
		this.state.prefs = data.preferences;
	} 

	// MAIN VIEW
	render() { 
		return(
			<Box margin="large" justify="center" align="center">
				<Box justify="between" width="100%" direction="row"> 
					<Box width="33%"  justify="center" align="start"   pad={{ left: "large" }}>
						<Link to='/home'>
							{<Icons.LinkPrevious color={Colors.dark3} size="large" justify="left" align="left"/>}
						</Link>
					</Box> 
					<Box width="33%" justify="center" align="center"> 
						{uploadTitle("User Profile")}
					</Box> 
					<Box width="33%"> 
					</Box> 
				</Box> 
				{horizontalSpacer("10px")} 
				<div> 
					<Text size="12pt" color={Colors.grey1}> Welcome back {this.state.username}</Text> 
				</div> 
				{horizontalSpacer("20px")} 
				{horizontalSpacer("20px")}
				<Box width="50%" wrap direction="row" justify="start" width="23.5%">
					<Text>{`${JSON.stringify(this.state.productlist)}\n`} uploadTitle(See Saved Products)</Text>
					<Text>{`${JSON.stringify(this.state.prefs)}\n`} Set Highlight Preferences</Text> 
					<Box width="10%"/>
				</Box> 
			</Box>
		);	
	}
}


export default withRouter(ProfilePage); 
