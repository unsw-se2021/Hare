import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu } from 'grommet';
import * as Icons from 'grommet-icons';
import { Redirect, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AuthService from './AuthService';

// PAGES IMPORTED 
import Home from './Home'; 
//import Help from './Help';
import UploadPage from './Upload'; 
import ProductPage from './Product';
//import Login from './Login'; 
import Navbar from './Navbar';
//import Footer from './Footer';  
//import Errors from './Error'; 
import NoPage from './404.js';
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
import ProfilePage from './Profile';

// THE VIEW RENDERING OBJECT 
class View extends Component { 

	componentDidMount() {
		console.log("View has been mounted");  
		AuthService.authenticateUser();
		console.log("[View.js componentDidMount()]: Authentication Service Start"); 
		console.log("[RESULT]: Auth is set to " + AuthService.isAuthenticated()); 
		this.setState({ loaded: true }); 
	} 


	render() {
		let productid = "0"; 
		return(
			<Router>
				<Switch>
				<Box alignContent='between' fill={true} > 
					<Box flex={true} fill={true} direction="row">
						<Box direction="row" fill={true} overflow="scroll">
							<Box pad={{ top: 'xsmall' }} fill={true}> 
									<Navbar />
									<Route exact path="/" component={Home} />	
									<Route path='/home' component={Home} /> 
									<Route path='/about' component={NoPage} /> 
									<Route path='/about/team' component={NoPage} />
									<Route path='/upload' component={UploadPage} />
									<Route path={`/product/:productId`} component={ProductPage} />
									<Route path={`/profile/:profileId`} component={ProfilePage} />
									<Route path='/404' component={NoPage} /> 
							</Box>
						</Box>
					</Box>
				</Box>
				</Switch> 
			</Router> 
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
