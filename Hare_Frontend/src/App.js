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
import View from './components/View.js';
import AuthService from './components/actions/AuthService';
import Colors from './components/styles/Color';


let updatedtheme = ({"global":{"colors":{"background":"#ffffff"},"font":{"family":"-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\",  \"Helvetica Neue\", Arial, sans-serif,  \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""}},"button":{"extend":[null,";"]}})
updatedtheme.global.colors.brand = Colors.primary;
updatedtheme.global.colors["accent-1"] = Colors.primary;
updatedtheme.global.focus = {
	border: { 
		color: Colors.primary
	}
}

//<!--<Router routes={routes} /> -->
class App extends Component { 
	
	constructor() { 
		super();
		AuthService.startAuthService();
	}

	render() { 
		return (
				<Grommet theme={updatedtheme} full={true}>
					<Box alignContent='between' fill={true}>
						<View/>
					</Box>
				</Grommet>
		);
	}
};

export default App; 
