import React, { useState, Component } from 'react'; 
import { Grommet, grommet, Button, Box, Heading, Menu, TextInput, Paragraph } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';

const PasswordInput = ({ value, ...rest }) => {
	const [inputValue, setValue] = useState(value);
	const [reveal, setReveal] = useState(false);
	return (
		<Box
			width="medium"
			direction="row"
			align="center"
			margin='medium'
			round="small"
			border
		>
			<TextInput
				plain
				type={reveal ? "text" : "password"}
				value={inputValue}
				onChange={event => setValue(event.target.value)}
				{...rest}
			/>
			<Button
				icon={reveal ? <Icons.FormLock size="medium" /> : <Icons.View size="medium" />}
				onClick={() => setReveal(!reveal)}
			/>
		</Box>
	);
};

class Login extends Component { 

	render() { 
		return(
			<div>
				<Box direction='row'>
					<Box width='33%'/>
					<Box width='33%'>
				<Box width="medium" margin='medium' direction="row"  align="center" round="small" border>
					<TextInput placeholder="Enter username" />
				</Box>
				<PasswordInput /> 	
				<Link to='/user'>
					<Box round="xsmall" height="40px" margin='medium' width='100%' justify="center" align="center" background="neutral-3"><Paragraph color="white">Log In</Paragraph></Box>
				</Link>
			</Box>
				<Box width='33%'/>

				</Box>
			</div>
		);	
	}
} 

export default Login; 
