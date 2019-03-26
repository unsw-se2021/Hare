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
import FourOFour from './404.js';
import User from './User'; 
import UserProduct from './UserProduct';
import Registration from './Register';
import compare from './compare';
import savedProduct from './savedProduct';
import personalSetting from './personalSetting';

class View extends Component { 
	render() { 
		return(
			<Box alignContent='between' fill={true} > 
				<Navbar />
				<Box flex={true} fill={true} direction="row">
					<Box direction="row" fill={true} overflow="scroll">
						<Box width="18%"/>
						<Box pad="small" fill={true}> 
							<Switch>
								<Route exact path="/" component={Home} />	
								<Route path='/home' component={Home} /> 
								<Route path='/help' component={Help} />
								<Route path='/upload' component={UploadPage} />
								<Route path='/badupload' component={Errors.BadUpload} /> 
								<Route path='/badscan' component={Errors.BadScan} /> 
								<Route path='/product' component={Product} />
								<Route path='/login' component={Login} />
								<Route path='/404' component={FourOFour} />
								<Route path='/user' component={User} />
								<Route path='/userproduct' component={UserProduct} /> 
								<Route path='/Register' component={Registration} />
			                                        <Route path='/compare' component={compare} />
			                                         <Route path='/savedProduct' component={savedProduct} />
								 <Route path='/personalSetting' component={personalSetting} />
							</Switch> 
						</Box>
						<Box width="18%"/> 
					</Box>
				</Box>
				<Footer />
			</Box>
		);	
	}
} 

export default View; 
