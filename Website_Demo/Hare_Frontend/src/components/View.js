import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu } from 'grommet';
import * as Icons from 'grommet-icons';
import { Switch, Route, Link } from 'react-router-dom';


// PAGES IMPORTED 
import Home from './pages/Home'; 
//import Help from './Help';
import UploadPage from './pages/Upload'; 
import Product from './pages/Product'; 
//import Login from './Login'; 
import Navbar from './Navbar';
//import Footer from './Footer';  
//import Errors from './Error'; 
//import FourOFour from './404.js';
//import User from './User'; 
//import UserProduct from './UserProduct';
//import Registration from './Register';
//import compare from './compare';
//import savedProduct from './savedProduct';
//import personalSetting from './personalSetting';
//import compareResult from './compareResult';
//import highlightPage from './highlightPage';
import homebg from './homebg.png'; 
import Colors from './Color.js';

/*const bgstyle = { 
	backgroundSize: 'cover',
	overflow: 'hidden', 
	zIndex: '1',
} */

/*const viewstyle = { 
	zIndex: '2',
	overflow: 'hidden', 
} */

/*const contentstyle = { 
	position: 'fixed', 
	top: '55px',
	left: 0, 
	zIndex: '2', 	
} */

// THE VIEW RENDERING OBJECT 
class View extends Component { 
	render() { 
		return(
			<Box alignContent='between' fill={true} > 
				<Navbar />
				<Box flex={true} fill={true} direction="row">
					<Box direction="row" fill={true} overflow="scroll">
						<Box pad={{ top: 'xsmall' }} fill={true}> 
							<Switch>
								<Route exact path="/" component={Home} />	
								<Route path='/home' component={Home} /> 
								<Route path='/upload' component={UploadPage} />
								<Route path='/product' component={Product} />
							</Switch> 
						</Box>
					</Box>
				</Box>
			</Box>
		);	
	}
} 




export default View;

/*
	<Route path='/help' component={Help} />
	<Route path='/badupload' component={Errors.BadUpload} /> 
	<Route path='/badscan' component={Errors.BadScan} /> 
	<Route path='/login' component={Login} />
	<Route path='/404' component={FourOFour} />
	<Route path='/user' component={User} />
	<Route path='/userproduct' component={UserProduct} /> 
	<Route path='/Register' component={Registration} />
	<Route path='/compare' component={compare} />
	Route path='/savedProduct' component={savedProduct} />
	<Route path='/personalSetting' component={personalSetting} />
	<Route path='/compareResult' component={compareResult} />
	<Route path='/highlightPage' component={highlightPage} /> */
