//
import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Button, Heading, Menu, Image, Text, Layer, DropButton, TextInput} from 'grommet';
import * as Icons from 'grommet-icons';
import { browserHistory, Redirect, Route, Link, Router, withRouter } from 'react-router-dom';
import Home from './Home'; 
import Colors from './styles/Color'; 
import logomark from './styles/logomark.svg';
import wlogomark from './styles/wlogomark.svg';
import AuthService from './actions/AuthService'; 

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

	constructor(props) { 
		super(props); 
		let authval = AuthService.hasAuthKey();
		this.state = {}; 
		this.state.auth = authval;
		this.state.color = props.tocolor;
		this.state.key = localStorage.getItem('auth');
	} 

	setAuth = (val) => { 
		this.setState({ auth: val }); 
		this.setState({ key: localStorage.getItem('auth')});
	} 

	onLogout = () => { 
		AuthService.LogOut(); 
		this.setState({auth: false});
		this.render();
		window.location.reload();
	} 

	onProfile = () => { 
		this.setState({ key: localStorage.getItem('auth')}, () => { 
			this.props.history.push(`/profile/${this.state.key}`);
		})
	}

	renderNoAuth = () => { 
		return(
			<Box direction="column" justify="between" gap="small">
				<Box> 
					Not logged in
				</Box> 
				<RegisterModal /> 
				<LoginModal onSubmit={this.setAuth}/> 
			</Box>
		);}

	renderAuth = () => { 
		return( 
			<Box direction="column" justify="between" gap="small">
				<Box> 
					You're logged in!
				</Box> 
				<Box gap="small" align="start"> 
					<Button icon={<Icons.User color={Colors.dark3}/>} onClick={this.onProfile} label="Profile" plain />
					<Button icon={<Icons.Logout color={Colors.dark3}/>}  onClick={this.onLogout} label="Log out" plain/>
				</Box> 
			</Box> 
		); 
	} 

	getDropDown = () => {
		let { auth } = this.state;
		auth = eval(auth);
		return( 
			<div>
				{ auth ? this.renderAuth() : this.renderNoAuth()} 
			</div> 
		); 
	} 

	getColor = () => { 
		return this.props.tocolor; 
	}

	render() {
		return(
			<DropButton
				icon={<Icons.User color={this.getColor}/>}
				dropAlign={{ top: 'bottom', right: 'right' }}
				dropContent={
					<Box pad="small" background="">
						{this.getDropDown()} 
					</Box> 
				}
			/>
		);
	}
}

class TextInputBar extends Component {
	state = { value: "" };

	ref = React.createRef();
	onChange = event => { 
		this.setState({ value: event.target.value })
		this.setUsername(event.target.value); 	
	};

	setUsername = (usr) => this.props.onSet(usr); 

	render() {
		const { value } = this.state;
		return (
			<Box width="medium">
				<TextInput placeholder={this.props.placeholder} ref={this.ref} value={value} onChange={this.onChange} />
			</Box>
		);
	}
}

class HiddenTextInputBar extends Component {
	state = { value: "" , display: ""};

	ref = React.createRef();
	onChange = event => { 
		this.setState({ value: event.target.value });
		this.setState({ display: event.target.value });
		this.setUsername(event.target.value); 	
	};

	setUsername = (text) => { 
		this.props.onSet(text); 
	}

	render() {
		const display = this.state.display
		return (
			<Box width="medium">
				<TextInput ref={this.ref} value={display} onChange={this.onChange} />
			</Box>
		);
	}
}

class LoginModal extends Component { 

	constructor() { 
		super();
		this.state = {}; 
		this.state.loginerr = undefined; 
		this.state.pss = ""; 
		this.state.usr = "";
	}

	state = {};
	onOpen = () => this.setState({ open: true });
	onClose = () => this.setState({ open: undefined });
	setusername = (usr) => this.setState({ usr: usr });  
	setpassword = (pss) => this.setState({ pss: pss }); 

	sendLogin = () => { 
		const { usr, pss } = this.state; 
		AuthService.authenticateUser(usr, pss)
		.then(res => {
			let data = res.data;  
			if(eval(data.result) === true) { 
				this.props.onSubmit(true); 
				AuthService.setAuthKey(data.key);
				this.onClose();
			} else { 
				this.props.onSubmit(false); 
				this.setState({ loginerr: "Invalid login credentials" });
			}
		})
		.catch(err => { 
			console.log("ERROR SUBMITTING LOG IN: ", err);
			this.setState({ loginerr: String(err) });
		});
	} 

	errmsg = () => { 
		if(this.state.loginerr !== undefined) { 
			return(
				<Box margin={{ bottom: "small"}} background="#ff9999" pad="small" border= {{ color: "red" }} round="xsmall">
					<Text color="red" size="12pt">{this.state.loginerr}</Text>
				</Box>
			)
		} else { 
			return(
				<div />
			)
		}
	}

	render() {
		const { open } = this.state;
		return (
			<div> 
				<Button icon={<Icons.Login color={Colors.dark3}/>} onClick={this.onOpen} label="Log in" plain/>
				{ open && (
					<Layer position="center" modal onClickOutside={this.onClose} onEsc={this.onClose}>
						<Box direction="row" pad={{ left: 'medium', right: 'medium', top: 'medium'}} justify="between"> 
							<Text size="24pt" color={Colors.dark3}> Log in </Text>
							<Button icon={<Icons.Close color={Colors.dark3} />} onClick={this.onClose}/>
						</Box> 

						<Box pad='medium'>
							{this.errmsg()}
							<Text size="12pt" color={Colors.dark3}> Username </Text> 
							<Box pad={{ bottom: 'xsmall' }}/>
							<TextInputBar placeholder="i.e Michael" onSet={this.setusername}/>
							<Box pad={{ bottom: 'medium' }}/>
							<Text size="12pt" color={Colors.dark3}> Password </Text> 
							<Box pad={{ bottom: 'xsmall' }}/>
							<HiddenTextInputBar onSet={this.setpassword}/>
							<Box pad={{ bottom: 'medium' }}/>
							<Button color={Colors.primary} label={<Text color={Colors.primary}>Submit</Text>} onClick={this.sendLogin}/>
						</Box> 
					</Layer> 
				)} 
			</div>
		);
	}

} 

class RegisterModal extends Component { 

	constructor() { 
		super();
		this.state = {}; 
		this.state.loginerr = undefined; 
		this.state.usr = ""; 
		this.state.email = "";
		this.state.password = "";
	}

	state = {};
	onOpen = () => this.setState({ open: true });
	onClose = () => this.setState({ open: undefined });
	setusername = (usr) => this.setState({ usr: usr });
	setemail = (at) => this.setState({ email: at })  
	setpassword = (pss) => this.setState({ pss: pss }); 

	sendRegister = () => { 
		const { usr, email, pss } = this.state; 
		// TODO: 
		AuthService.registerUser(usr, email, pss)
		.then(res => { 
			let data = res.data; 
			if(eval(data.result) === true) {
				this.onClose();
			} else {
				this.setState({ loginerr: "You can't register with these details" });
			}
		})
		.catch(err => { 
				this.setState({ loginerr: "Network error: " + err });
		})
	} 

	errmsg = () => { 
		if(this.state.loginerr !== undefined) { 
			return(
				<Box margin={{ bottom: "small"}} background="#ff9999" pad="small" border= {{ color: "red" }} round="xsmall" width="medium" wrap>
					<Text color="red" size="12pt">{this.state.loginerr}</Text>
				</Box>
			)
		} else { 
			return(
				<div />
			)
		}
	}

	onOpen = () => this.setState({ open: true });
	onClose = () => this.setState({ open: undefined });

	render() {
		const { open } = this.state;
		return (
			<div> 
				<Button icon={<Icons.UserNew color={Colors.dark3}/>}  onClick={this.onOpen} label="Register" plain/>
				{ open && (
					<Layer position="center" modal onClickOutside={this.onClose} onEsc={this.onClose}>
						<Box direction="row" pad={{ left: 'medium', right: 'medium', top: 'medium'}} justify="between"> 
							<Text size="24pt" color={Colors.dark3}> Register </Text>
							<Button icon={<Icons.Close color={Colors.dark3} />} onClick={this.onClose}/>
						</Box> 
							<Box pad='medium' wrap>
								{this.errmsg()}
								<Text size="12pt" color={Colors.dark3}> Username </Text> 
								<Box pad={{ bottom: 'xsmall' }}/>
								<TextInputBar placeholder="A unique name to use" onSet={this.setusername}/>
								<Box pad={{ bottom: 'medium' }}/>
								<Text size="12pt" color={Colors.dark3}> Email </Text> 
								<Box pad={{ bottom: 'xsmall' }}/>
								<TextInputBar placeholder="Your email address" onSet={this.setemail}/>
								<Box pad={{ bottom: 'medium' }}/>
								<Text size="12pt" color={Colors.dark3}> Password </Text> 
								<Box pad={{ bottom: 'xsmall' }}/>
								<HiddenTextInputBar onSet={this.setpassword}/>
								<Box pad={{ bottom: 'medium' }}/>
								<Button color={Colors.primary} label={<Text color={Colors.primary}>Submit</Text>} onClick={this.sendRegister}/>
							</Box> 
					</Layer> 
				)} 
			</div>
		);
	}

} 

class Navbar extends Component { 

	constructor(props) { 
		super(props); 
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
	}

	getLocation = () => {
		let path = this.props.location.pathname; 
		let to_render; 
		this.props.setpath(path);
		if(path == "/" || path == "/home") { 
			to_render =  this.renderTransparentNav(); 
		} else { 
			to_render =  this.renderNormalNav(); 
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

	renderNormalNav = () => { 
		return( 
			<Box 
				background={Colors.grey3}
				direction="row"
				elevation="small"
				width="100%"
				height="100%">
				<Box direction="row" width="33%" background={Colors.grey3} align="center">
					<NavbarDiv/>
					<NavbarDiv/>
					<Link to='/about' style={{ textDecoration: 'none' }}>{NavbarText("About")}</Link> 
					<NavbarDiv/>
					<Link to='/about/team' style={{ textDecoration: 'none' }}>{NavbarText("Team")}</Link>
					<NavbarDiv/>
					<a href="https://github.com/unsw-se2021/Hare/"  style={{ textDecoration: 'none' }}>{NavbarText("Source Code")}</a>
				</Box> 
				<Box width="33%" background={Colors.grey3} align="center">
					<Link to='/home' style={{ display: 'block' }}> 
						<Image src={logomark} height="30px" margin="15px"/>
					</Link>
				</Box>
				<Box direction="row" align="center" justify="end" background={Colors.grey3} width="33%">
					<UserButton {...this.props} tocolor={Colors.dark3} />
					<NavbarDiv/>
					<NavbarDiv/>
				</Box>
			</Box> 
		);
	}

		renderTransparentNav = () => { 
			return( 
				<Box 
					direction="row"
					elevation="small"
					width="100%"
					height="100%"
					background={Colors.primary} >
					<Box direction="row" width="33%" align="center">
						<NavbarDiv/>
						<NavbarDiv/>
						<Link to='/about' style={{ textDecoration: 'none' }}>
						<Text direction="row" color={Colors.grey3} size="small" weight="bold"> 
							About
						</Text>
						</Link> 
						<NavbarDiv/>
						<Link to='/about/team' style={{ textDecoration: 'none' }}>
						<Text direction="row" color={Colors.grey3} size="small" weight="bold"> 
							Team
						</Text>
						</Link>
						<NavbarDiv/>
						<a href="https://github.com/unsw-se2021/Hare/"  style={{ textDecoration: 'none' }}>
						<Text direction="row" color={Colors.grey3} size="small" weight="bold"> 
							Source Code
						</Text>
						</a>
					</Box> 
					<Box width="33%" align="center">
						<Link to='/home' style={{ display: 'block' }}> 
							<Image src={wlogomark} height="30px" margin="15px"/>
						</Link>
					</Box>
					<Box direction="row" align="center" justify="end"width="33%">
						<UserButton {...this.props} tocolor={Colors.grey3}/>
						<NavbarDiv/>
						<NavbarDiv/>
					</Box>
				</Box> 
			);
		}
	} 

export default withRouter(Navbar);
