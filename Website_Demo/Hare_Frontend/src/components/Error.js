import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu, Paragraph } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';

class BadScan extends Component { 

	render() { 
		return(
			<div>
				NO PRODUCT DETAILS FOUND FROM SCAN
				<Link to='/upload'>Back</Link>
			</div>
		);	
	}
} 

class BadUpload extends Component { 
	
	render() { 
		return(
			<div> 
				NO PRODUCT DETAILS FOUND FROM UPLOAD
				<Link to='/upload'>Back</Link>
			</div> 
		); 
	} 
} 

const Errors = { 
	BadScan, 
	BadUpload
}; 

export default Errors; 
