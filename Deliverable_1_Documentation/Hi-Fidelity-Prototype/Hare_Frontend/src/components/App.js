// Main container for website application. 
import React, { Component } from 'react'; 
import { Grommet } from 'grommet'; 
import Theme from './Theme.js'; 

class App extends Component { 
	render() {  
		return ( 
			<Grommet className="App" theme={Theme}> 
				<h1>Hello</h1>
			</Grommet>
		);
	}
};

export default App;
