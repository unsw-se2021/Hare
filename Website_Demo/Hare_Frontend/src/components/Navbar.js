import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Button, Heading, Menu, Image, Text} from 'grommet';
import * as Icons from 'grommet-icons';
import { browserHistory, Redirect, Route, Link, Router, withRouter } from 'react-router-dom';
import Home from './pages/Home'; 
//import Login from './Login'; 
//import Register from './Register'; 
import Colors from './Color'; 
import logomark from './logomark.svg';

const NavbarText = (Contents) => { 
	return(
		<Text direction="row" color={Colors.dark3} size="small" weight="bold"> 
		{Contents}
		</Text> 
	); 
};

const NavbarDiv = () => { 
	return( 
		<Box width="50px"> 
		</Box> 
	); 
}; 

const NavbarObj = () => { 
	return( 
		<Box 
			tag='header' 
			background={Colors.grey3}
			direction="row"
			elevation="small"
			width="100%"
			height="100%"
			>
					<Box direction="row" width="33%" background={Colors.grey3} align="center">
						<NavbarDiv/>
						<NavbarDiv/>
						{NavbarText("About")} 
						<NavbarDiv/>
						{NavbarText("Team")}
						<NavbarDiv/>
						{NavbarText("Source Code")}
					</Box> 
					<Box width="33%" background={Colors.grey3}> 
						<Image src={logomark} height="30px" margin="15px"/>
					</Box>
					<Box direction="row" align="center" justify="end" background={Colors.grey3} width="33%">
						<Icons.User color={Colors.dark3}/>
						<NavbarDiv/>
						<NavbarDiv/>
					</Box>
				</Box> 
	);
}

const TransparentNavbarObj = () => { 
}



class Navbar extends Component { 

	navigateToHome = () => { 
		this.props.history.push('/home'); 
	} 

	navigateToHelp = () => {
		this.props.history.push('/help');
	}

	navigateToLogin = () => { 
		this.props.history.push('/login'); 
	} 

	navigateToRegister = () => { 
		this.props.history.push('/register'); 
	} 

	componentDidMount () {
		this.routeChanged()
	}

	componentDidUpdate (prevProps) {
		let { location: { pathname } } = this.props

		if (prevProps.location.pathname === pathname) return
		this.routeChanged()
	}

	routeChanged () {
		let { location, push, replace, actions } = this.props

		/*actions.forEach(action => {
			action(location, { push, replace })
		})*/
	}

	getLocation = () => {

		let path = this.props.location.pathname; 
		let to_render; 

		if(path == "/" || path == "/home") { 
			to_render =  NavbarObj(); 
		} else { 
			to_render = NavbarObj(); 
		} 

		return( 
			<div> 
				{to_render}
			</div> 
		); 
	} 

	render() { 
		return(
			<div> 
				{this.getLocation()} 
			</div> 
		);
	}
} 
export default withRouter(Navbar);
