import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Button, Heading, Menu, Paragraph, Text } from 'grommet';
import * as Icons from 'grommet-icons';
import { Switch, BrowserRouter as Router, browserHistory, Redirect, withRouter, Link  } from 'react-router-dom';
import Colors from './Color';
import Home from './pages/Home'; 


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
const cameraWindow = () => { 
	return( 
		<Box background={Colors.grey1} pad="10%">
			<Icons.Camera color={Colors.grey3} size="large"/>
		</Box> 
	); 
} 

// TODO: 

const horizontalSpacer = (amt) => { 
	return( 
		<Box width="100%" height={amt}> 
		</Box> 
	); 
} 



class UploadPage extends Component { 

	componentDidMount() { 
		this.loaded = false
	} 

	onChangeHandler=event=>{
		this.setState({
			selectedFile: event.target.files[0],
			loaded: 1,
		})

		this.loaded = true 
	}


	// FILE UPLOAD BUTTON 
	uploadFile = () => { 
		return(
			<Box width="45%" background={Colors.primary}>  
				<input type='file' id='file' onChange={this.onChangeHandler}/>	
			</Box> 
		); 
	} 

	getProductId = () => { 
		return 1; 
	} 

	// SUBMIT BUTTON 
	submitButton = () => { 
		return( 
			<Link to={`product/${this.getProductId()}`} style={{ textDecoration: 'none' }}> 
				<Text size="12pt" color={Colors.grey3}> Submit</Text>
			</Link> 
		); 
	} 

	// UPLOAD & SUBMIT CONTAINER 
	fileUploaded = () => {
		if(this.loaded == true) {
			//let pageid = getProductID(); 
			return(
				<Box direction="row" background={Colors.primary} pad="small" width="45%" justify="between" align="center">
					<Icons.Checkmark size="medium" color={Colors.grey1}/>
					{this.submitButton()} 
				</Box>  
			);
		} else { 
			return( 
				<Box direction="row" background={Colors.primary} pad="small" width="45%" justify="between" align="center">
					<Icons.StatusPlaceholder size="medium" color={Colors.grey1}/>
					<Text size="12pt" color={Colors.grey3}> Submit</Text> 
				</Box>  
			);

		}

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
						{uploadTitle("Upload an image")}
					</Box> 
					<Box width="33%"> 
					</Box> 
				</Box> 
				{horizontalSpacer("10px")} 
				<div> 
					<Text size="12pt" color={Colors.grey1}> Not sure how it works? You can find a guide </Text> 
					<Text size="12pt" color={Colors.primary}> here </Text>
				</div> 
				{horizontalSpacer("20px")} 
				{cameraWindow()}
				{horizontalSpacer("20px")}
				<Box direction="row" justify="start" width="23.5%"> 
					{this.uploadFile()}
					<Box width="10%"/>
					{this.fileUploaded()}
				</Box> 
			</Box>
		);	
	}
}


export default withRouter(UploadPage); 
