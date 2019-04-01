import React, { Component } from 'react'; 
import { Grommet, grommet,TextInput, Box, Button, Heading, Menu, Paragraph } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';

class Registration extends Component { 

	render() { 
		return(
			<div>
			<Box pad="medium" gap="small">  
			<h3> Register your details </h3>
			<TextInput
				placeholder="Name"
			/>
			<TextInput 
				placeholder="Username"
			/> 
			<TextInput
				placeholder="Password" 
			/> 
			<TextInput 
				placeholder="Confirm Password"
			/> 
			<TextInput 
				placeholder="Email"
			/> 
		</Box>
		<Box round="xsmall" height="40px" justify="center" align="center" background="neutral-3">
			<Button label="Submit"/>
		</Box>
			</div>
		);	
	}
} 

export default Registration; 
