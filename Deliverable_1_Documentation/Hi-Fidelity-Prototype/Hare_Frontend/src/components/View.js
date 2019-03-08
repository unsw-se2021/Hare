import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu } from 'grommet';
import * as Icons from 'grommet-icons';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom'; 
import Home from './Home'; 
import Help from './Help';
import UploadPage from './Upload'; 
import Product from './Product'; 
import Login from './Login'; 
import Navbar from './Navbar'; 
import Footer from './Footer';  

class View extends Component { 

	constructor(props){ 
		super(props);
		this.state = { 
			frame: "default",
		};
	}

	render() { 
		return(
			<Router >
				<Box alignContent='between' fill={true}>
					<Navbar />
					<Box flex={true} fill={true} direction="row">
						<Box width="10%" background="dark-3" />
						<Box pad="medium" fill={true}  background="light-3" overflow-y="scroll"> 
							<Switch>
								<Route exact path="/" component={Home} />	
								<Route path='/home' component={Home} /> 
								<Route path='/help' component={Help} />
								<Route path='/upload' component={UploadPage} />
								<Route path='/product' component={Product} />
								<Route path='/login' component={Login} /> 
							</Switch> 
						</Box>
						<Box width="10%" background="dark-3" /> 
					</Box>
					<Footer />
				</Box>
			</Router> 
		);	
	}
} 

export default View; 
