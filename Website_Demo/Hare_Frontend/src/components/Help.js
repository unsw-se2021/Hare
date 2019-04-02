import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Paragraph, Text, Accordion, AccordionPanel, Heading } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';


class Help extends Component { 
	
	render() { 
		return(
			<div>
	<Box>

	<Heading margin="none" alignSelf = "center">Need Help?</Heading>	
       </Box>
	<Accordion>
            <AccordionPanel label = "Why Login?">
	        <Box background = "light-2">Login to have a personal profile to use smart comparisons and ingredients highlightings, You could login with your google or facebook account, if you dont have either click register button to create a new account!!</Box>
	     </AccordionPanel>
	    <AccordionPanel label = "How to use compare multiple products?">
	        <Box Background="light-2">Login as our client, choose from history files to make comparison!</Box>
	    </AccordionPanel>
	    <AccordionPanel label = "How to add ingredients to highlight?">
	        <Box Background = "light-2">Create a pre-set to highlight chosen ingredients or ingredient categories in your preference page</Box>
	    </AccordionPanel>
	   <AccordionPanel label = "How to view details about the product after your picture has been uploaded?">
		<Box Background="light-2">After the picture is uploaded click on submit and on the product page cliuck on the drop down from each ingredient category to read more about it</Box>
		</AccordionPanel>
	</Accordion>
       
            
      </div>
		);	
	}
} 

export default Help; 
