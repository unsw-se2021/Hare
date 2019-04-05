import React, { useState, Component } from 'react'; 
import { Grommet, grommet, Button, Box, Heading, Menu, TextInput, Paragraph } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';

const PasswordInput = ({ value, ...rest }) => {
	const [inputValue, setValue] = useState(value);
	const [reveal, setReveal] = useState(false);
	return (
		<Box round="small" margin="medium" width="medium" align="center" direction="row" border >
			<TextInput
				plain
				placeholder="Enter Password"
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
				<Box align="center" alignSelf="center" direction='column'>
					<Box alignContents="stretch" width="medium" margin="medium" align="center" round="small">
						<Box round="small" direction="row" margin="medium" width="medium">
							<TextInput placeholder="Enter Username" />
						</Box>
	
						<PasswordInput />
						<Button href='/user' label="Log In"/>
					</Box>
				</Box>
			</div>
		);	
	}
} 

export default Login; 
