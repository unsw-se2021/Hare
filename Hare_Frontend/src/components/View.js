import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu } from 'grommet';
import * as Icons from 'grommet-icons';
import { Redirect, withRouter, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AuthService from './actions/AuthService';

import Home from './Home'; 
import UploadPage from './Upload'; 
import ProductPage from './Product';
import Navbar from './Navbar';
import NoPage from './404.js';
import homebg from './styles/homebg.png'; 
import Colors from './styles/Color.js';
import ProfilePage from './Profile';

const history = require("history").createBrowserHistory();
history.listen((location, action) => {
	console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
	console.log(`The last navigation action was ${action}`)
})

// THE VIEW RENDERING OBJECT 
class View extends Component { 

	constructor(props) { 
		super(props);
		this.state = {}; 
		this.place = undefined;
	}

	getLocation = (path) => { 
		if(path == "/" || path == "/home") {
			this.place = "url("+homebg+")";
		} else { 
			this.place = Colors.grey3;
		}
		this.render(this.place);
	}

	render(backgroundimg) {
		return(
			<Router history={history}> 
				<Switch>
				<Box alignContent='between' fill={true} > 
					<Box flex={true} fill={true} direction="row">
						<Box direction="row" fill={true} overflow="scroll-y">
							<Box fill={true} background={backgroundimg}> 
									<Navbar setpath={this.getLocation}/>
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
