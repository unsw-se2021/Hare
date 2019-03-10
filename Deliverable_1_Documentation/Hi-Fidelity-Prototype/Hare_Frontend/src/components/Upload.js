import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu, Paragraph, Text } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';
import { Button } from 'grommet';

const tipHeader = (icon, title) => {
	return	<Box direction="row" align="center" alignContent="center" gap="small">
				{icon}{title}
			</Box>
}

class UploadPage extends Component { 

	render() { 
		return(
			<div>
				<Heading>Upload</Heading>
				<Box direction="row">
					<Box width="50%" gap="small">
						<Box
							direction="row"
							width="medium"
							height="medium"
							justify="center"
							align="center"
							alignContent="center"
							round="small"
							background="light-3"
						>
							<Icons.Camera alignSelf="center" size="xlarge"/>
						</Box>
						<Box width="medium" background="light-3" round="small" pad="small">
							<Button
								width="100%"
								icon={<Icons.FolderOpen/>}
								label="Browse"
							>
								Browse
							</Button>
						</Box>
						<Link full={true} to="/product">
							<Box width="medium" background="light-3" round="small" pad="small">
								<Button
									width="100%"
									icon={<Icons.Upload/>}
									label="Submit"
								>
									Submit
								</Button>
							</Box>
						</Link>
					</Box>
					<Box width="50%" gap="small">
						<Box>
							{tipHeader(<Icons.Info/>, <Heading level="4">Lighting</Heading>)}
							<Text>Try to use even lighting in your photo. If you need to, enable the flash on your camera.</Text>
						</Box>
						<Box>
							{tipHeader(<Icons.Grid/>, <Heading level="4">Direction</Heading>)}
							<Text>Take the photo as directly as possible, with your phone parallel to the ingredients list.</Text>
						</Box>
						<Box>
							{tipHeader(<Icons.Globe/>, <Heading level="4">Translation</Heading>)}
							<Text>HARE will automatically translate products with ingredients in a different language.</Text>
						</Box>
						<Box>
							{tipHeader(<Icons.Save/>, <Heading level="4">Save</Heading>)}
							<Text>Signed in users will be able to save their product photos for comparison later.</Text>
						</Box>
					</Box>
				</Box>
				<br /> 
				<br /> 
				<br /> 
				<br /> 
			</div>
		);	
	}
} 

export default UploadPage; 
