import React, { Component } from 'react'; 
import { MaskedInput, Text, DropButton, Button, Grommet, grommet, Box, Heading, Menu, TextInput, Paragraph } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types'; 

var user_name = "John Doe"; 
const DropHighlightContent = ({ onClose }) => (
	<div> 
		<Box pad="small" direction="column" wrap="" justify="between">
			<Button icon={<Icons.Close />} onClick={onClose} />
			<br />
			 
			<br /> 
			<Box background="dark-2" justify="between" direction="row" > 
				<Box >Ingredient X </Box> 	
			
				<Box pad="small" background="red" /> 	
			</Box>


			 <Box background="dark-2" justify="between" direction="row" >
                                <Box >Ingredient Y </Box>

                                <Box pad="small" background="red" />
                        </Box>

		</Box>
		<Text>Content</Text> 
	</div>
);

DropHighlightContent.propTypes = {
	onClose: PropTypes.func.isRequired
};

class HighlightDropButton extends Component {
	state = {};

	onClose = () => {
		this.setState({ open: false });
		setTimeout(() => this.setState({ open: undefined }), 1);
	};

	render() {
		const { open } = this.state;
		return (
			<Box pad="large">
				<DropButton
					label="Open"
					open={open}
					onClose={() => this.setState({ open: undefined })}
					dropContent={<DropHighlightContent onClose={this.onClose}/>}
				>Customize Preferences</DropButton>
			</Box>
		);
	}
}


class User extends Component { 

	render() { 
		return(
			<div>
				<h1>Welcome {user_name}</h1>
				<br /> 

				 <Box direction ="row" alignSelf = "center">
                                        <Box alignSelf ="center" pad = "medium"  justify ="center" round = "small"  background="dark-3">
                                                <Box>
                                                        <Icons.UserSettings alignSelf="center" size="large" />
                                                        <Link to="/personalSetting">View personal settings</Link>
                                                </Box>
                                        </Box>
                                        </Box>

			                <hr />





				<Box direction ="row" alignSelf = "center">
                                        <Box alignSelf ="center" pad = "medium"  justify ="center" round = "small"  background="dark-3">
                                                <Box>
                                                        <Icons.Compare alignSelf="center" size="large" />
                                                        <Link to="/compare">Compare two products</Link>
                                                </Box>
                                        </Box>
                                        </Box>

	
						                                        <hr />

	
                                                 
                         
 
                                <Box direction ="row" alignSelf = "end">
                                        <Box alignSelf ="center" pad = "medium"  justify ="center" round = "small"  background="dark-3">
                                                <Box>
                                                        <Icons.Save alignSelf="center" size="large" />
                                                        <Link to="/savedProduct">View Saved products</Link>
                                                </Box>
                                        </Box>
                                        </Box>

				  <hr />
				
				 <Box direction ="row" alignSelf = "end">
                                        <Box alignSelf ="center" pad = "medium"  justify ="center" round = "small"  background="dark-3">
                                                <Box>
                                                        <Icons.Save alignSelf="center" size="large" />
                                                        <Link to="/highlightPage">View Highlight preferences</Link>
                                                </Box>
                                        </Box>
                                        </Box>




 
				
				<br />




 
			</div>
		);	
         	}
} 

export default User; 
