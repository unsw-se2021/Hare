import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu } from 'grommet';
import * as Icons from 'grommet-icons';
import { Switch, Route, Link } from 'react-router-dom'; 
import Home from './Home'; 
import Help from './Help';
import UploadPage from './Upload'; 
import Product from './Product'; 
import Login from './Login'; 
import Navbar from './Navbar'; 
import Footer from './Footer';  
import Errors from './Error'; 


class View extends Component { 

	render() { 
		return(
			<Box alignContent='between' fill={true} >
				<Navbar />
				<Box flex={true} fill={true} direction="row">
					<Box direction="row" fill={true} overflow="scroll">
						<Box width="10%" background="light-1" />
						<Box pad="small" fill={true}  background="light-1" > 
							<Switch>
								<Route exact path="/" component={Home} />	
								<Route path='/home' component={Home} /> 
								<Route path='/help' component={Help} />
								<Route path='/upload' component={UploadPage} />
								<Route path='/badupload' component={Errors.BadUpload} /> 
								<Route path='/badscan' component={Errors.BadScan} /> 
								<Route path='/product' component={Product} />
								<Route path='/login' component={Login} /> 
							</Switch> 
						</Box>
						<Box width="10%" background="light-1" /> 
					</Box>
				</Box>
				<Footer />
			</Box>
		);	
	}
} 

export default View; 
