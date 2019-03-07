import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom'; 
import Home from './Home'; 
import Help from './Help';

class View extends Component { 

	constructor(props){ 
		super(props);
		this.state = { 
			frame: "default",
		};
	}

	render() { 
		return(
			<Router>
				<Box flex={true} fill={true} direction="row">
					<Box pad='small' flex={true} background="dark-3"/>
					<Box pad='small' width='large' flex={true} pad="xlarge" background="light-3"> 
						<Route exact path="/" component={Home} />	
						<Route path='/home' component={Home} /> 
						<Route path='/help' component={Help} />
					</Box>
					<Box pad='small' flex={true} background="dark-3"/> 
				</Box>
			</Router> 
		);	
	}
} 

export default View; 
