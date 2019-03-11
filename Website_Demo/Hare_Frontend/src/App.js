/* FILENAME: App.js
 * DESCRIPTION: This file is where the application is actually 
 *			put together for the browser. All component calls 
 *			will be made from here, and the final product 
 *			(a Component called "App") is exported to index.js
 *			to be rendered with ReactDOM under 'root'
 */
import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Heading, Menu } from 'grommet';
import * as Icons from 'grommet-icons';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './Routes';
import Navbar from './components/Navbar.js';
import View from './components/View.js';
import Footer from './components/Footer.js';

//<!--<Router routes={routes} /> -->
class App extends Component { 
	render() { 
		return (
			<Router>
				<Grommet theme={grommet} full={true}>
					<Box alignContent='between' fill={true}>
						<View/>
					</Box>
				</Grommet>
			</Router> 
		);
	}
};

export default App; 
