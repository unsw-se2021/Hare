import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Button, Heading, Menu, Paragraph, Text } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';
import Colors from '../Color';


// TODO: 
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
const uploadFile = () => { 
	return( 
		<Box direction="row" background={Colors.primary} pad="small" width="45%" justify="between" align="center">
			<Icons.Folder color={Colors.grey3}/>
			<Text size="12pt" color={Colors.grey3}>   Upload file </Text> 
		</Box>  
	); 
} 

const horizontalSpacer = (amt) => { 
	return( 
		<Box width="100%" height={amt}> 
		</Box> 
	); 
} 

// TODO: 
class submitButton extends Component { 
	

	render() {  
		return( 
			<Box background={Colors.primary} width="20%"> 
				...	
			</Box> 
		); 
	} 
} 

class UploadPage extends Component { 

	fileReady = () => { 
		if(this.fileUploaded == true) { 
			return( 
				<div> 

				</div> 
			); 
		} else { 
			return( 
				<div> 

				</div> 
			); 
		} 
	} 

	render() { 
		return(
			<Box margin="large" justify="center" align="center">
				<Box justify="between" width="100%" direction="row"> 
					<Box width="33%"  justify="center" align="start"   pad={{ left: "large" }}> 
						<Icons.LinkPrevious color={Colors.dark3} size="large" justify="left" align="left"/>
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
					{uploadFile()}
					<Box width="10%"/>
					{uploadFile()}
				</Box> 
			</Box>  
		);	
	}
} 

export default UploadPage; 
