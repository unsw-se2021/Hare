import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Button, Heading, Menu, Image, Text, Layer, DropButton, TextInput} from 'grommet';
import * as Icons from 'grommet-icons';
import { browserHistory, Redirect, Route, Link, Router, withRouter } from 'react-router-dom';
import Home from './pages/Home'; 
//import Login from './Login'; 
//import Register from './Register'; 
import Colors from './Color'; 
import logomark from './logomark.svg';
import AuthService from './AuthService'; 

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



class UserButton extends Component {

	render() { 
		return(
			<DropButton
				icon={<Icons.User color={Colors.dark3}/>}
				dropAlign={{ top: 'bottom', right: 'right' }}
				dropContent={
					<Box pad="small" background="">
						<RegisterModal/>
						<LoginModal/>
					</Box> 
				}
			/>
		);
	}
}

class LoginModal extends Component { 

	state = {};

	onOpen = () => this.setState({ open: true });

	onClose = () => this.setState({ open: undefined });


	render() {
		const { open } = this.state;
		return (
			<div> 
				<Button icon={<Icons.Login color={Colors.dark3}/>}  onClick={this.onOpen} label="Log in" plain/>
				{ open && (
					<Layer position="center" modal onClickOutside={this.onClose} onEsc={this.onClose}>
						<Box pad="medium" gap="small" width="medium" height="400px">
							<Text size="24pt" color={Colors.dark3}> Log in </Text>
							<Box height="20px"/>
							<Text size="12pt"> Username </Text> 
							<Box fill align="center" justify="start" pad="large">
								<Box width="medium">
									<TextInput ref={this.ref} value={value} onChange={this.onChange} />
								</Box>
							</Box>
							<Text size="12pt"> Password</Text> 
						</Box> 
					</Layer> 
				)} 
			</div>
		);
	}

} 

class RegisterModal extends Component { 

	state = {};

	onOpen = () => this.setState({ open: true });

	onClose = () => this.setState({ open: undefined });


	render() {
		const { open } = this.state;
		return (
			<div> 
				<Button icon={<Icons.UserNew color={Colors.dark3}/>}  onClick={this.onOpen} label="Register" plain/>
				{ open && (
					<Layer position="center" modal onClickOutside={this.onClose} onEsc={this.onClose}>
						<Box pad="medium" gap="small" width="medium" height="400px">
							<Text size="24pt" color={Colors.dark3}> Log in </Text> 
						</Box> 
					</Layer> 
				)} 
			</div>
		);
	}

} 






const NavbarObj = () => { 
	return( 
		<Box 
			tag='header' 
			background={Colors.grey3}
			direction="row"
			elevation="small"
			width="100%"
			height="100%">
			<Box direction="row" width="33%" background={Colors.grey3} align="center">
				<NavbarDiv/>
				<NavbarDiv/>
				<Link to='/home' style={{ textDecoration: 'none' }}>{NavbarText("About")}</Link> 
				<NavbarDiv/>
				<Link to='/upload' style={{ textDecoration: 'none' }}>{NavbarText("Team")}</Link>
				<NavbarDiv/>
				<Link to='/help' style={{ textDecoration: 'none' }}>{NavbarText("Source Code")}</Link>
			</Box> 
			<Box width="33%" background={Colors.grey3}>
				<Image src={logomark} height="30px" margin="15px"/>
			</Box>
			<Box direction="row" align="center" justify="end" background={Colors.grey3} width="33%">
				<UserButton />
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
