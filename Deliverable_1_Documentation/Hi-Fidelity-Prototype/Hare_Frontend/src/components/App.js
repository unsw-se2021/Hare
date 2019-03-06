// Main container for website application. 
import React, { Component } from 'react'; 
import { Grommet, Box } from 'grommet'; 
import Theme from './Theme.js'; 
import View from './View.js'; 

class Navbar extends Component { 

};

class Body extends Component { 

}; 

class Footer extends Component { 

}; 

class App extends Component { 
	render() { 
		return( 
			<Grommet theme={Theme} full={true}>
				<Box fill={true}> 
					<Navbar />
					1
					<Body />
					2
					<Footer /> 
					3
				</Box>
			</Grommet> 
		); 
	}
} 

export default App; 
