
import React, { Component } from 'react';
import { Grommet, grommet, Box, Button, Heading, Menu, Paragraph, Text, Meter, Image, TextInput, Layer, Accordion, AccordionPanel } from 'grommet';
import * as Icons from 'grommet-icons';
import { Switch, BrowserRouter as Router, browserHistory, Redirect, withRouter, Link } from 'react-router-dom';
import Colors from './styles/Color';
import Style from './styles/Style';
import Home from './Home';
import AuthService from './actions/AuthService';
import { IncomingMessage } from 'http';
import ScanService from './actions/ScanService';
import UserService from './actions/UserService';

class ProfilePage extends Component {

	constructor(props) {
		super(props);

		this.state = {};
		// If page has acquired everything 
		this.state.loading = true;
		// If loading resulted in an error 
		this.state.loaderr = undefined;
		// key 
		this.state.key = localStorage.getItem('auth');
		// Update userdata 
		UserService.getProfileData(String(this.state.key)).then(res => { 
			localStorage.setItem('userdata', JSON.stringify(res.data));
			// If the user is logged in, get their userdata 
			this.state.userdata = JSON.parse(localStorage.getItem('userdata'));
		})
			// A check to see if the user is authenticated 
			this.state.loggedin = (this.state.key !== undefined && this.state.key !== null);
	}

	goBack = () => {
		this.props.history.goBack();
	}


	// MAIN VIEW
	render() {

		if (this.state.loggedin !== true) {
			return (
				<Redirect to='/' />
			);
		}

		return (
			<Box overflow="scroll-y">
				<Box margin={{ top: "large" }} justify="center" align="center">
					<Box justify="between" width="100%" direction="row">
						<Box width="33%" justify="center" align="start" pad={{ left: "large" }}>
							<Button margin="large" icon={<Icons.LinkPrevious color={Colors.dark3} size="large" justify="left" align="left" />} onClick={this.goBack} />
						</Box>
						<Box width="33%" justify="center" align="center">
							{Style.Title("Your profile settings")}
						</Box>
						<Box direction="row" width="33%" justify="start" align="end" pad={{ left: "medium" }} >
						</Box>
					</Box>
				</Box>
				<Box align="center" fill>
					<Text size="12pt" color={Colors.grey1}>
						See your saved scan results and set highlighting preferences.
					</Text>
					<HighlightingPreferences {...this.props} />
					<SavedProducts {...this.props} />
					<Box height="200px" />
				</Box>
			</Box>
		);
	}
}

class HighlightingPreferences extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Box direction="column" margin="medium" width="600px">
				<Box direction="column" gap="small">
					<Text size="20pt" color={Colors.dark3}>Highlighting Rules:</Text>
					<Box direction="column">
						<CurrentSettings {...this.props} />
						<NewPreferences {...this.props} />
					</Box>
				</Box>
			</Box>
		);
	}

}

class CurrentSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.loading = true;
		this.state.userdata = JSON.parse(localStorage.getItem('userdata'));
		this.state.preferences = get_preferences(this.state.userdata.preferences);
		this.state.numprefs = this.state.preferences.length;
		this.state.rules = [];
	}

	deletePref = (prefs, value, index) => {

		let new_userdata = JSON.parse(localStorage.getItem('userdata'));
		let new_prefs = prefs;
		if (index > -1) {
			new_prefs.splice(index, 1);
		}
		let ingredients = []; 
		new_prefs.forEach((value, index) => { 
			ingredients.push({ ingredient: value.name, color: value.color });
		})

		new_userdata.preferences.ingredients = ingredients;
		UserService.updateUserdata(new_userdata)
			.then(() => {
				window.location.reload();
			})
			.catch(e => { console.log(String(e)) })

	}

	getHighlightingOptions = () => {
		if (this.state.numprefs === 0) {
			return (
				<Box align="center" justify="center" pad="small" gap="small">
					<Icons.Note color={Colors.dark3} size="medium" />
					<Text size="12pt" color={Colors.dark3}>You haven't set any highlighting rules!</Text>
				</Box>
			)
		} else {
			let prefs = this.state.preferences;
			let rules = [];
			prefs.forEach((value, index) => {
				console.log(value, index);
				rules.push(
					<Box justify="center" direction="column" width="100%" pad="5px">
						<Box direction="row" justify="between">
							<Box direction="row" align="center" gap="medium">
								<Text>{index}:</Text>
								<Box background={Style.ColorIndex[value.color]} pad="2px" round>
									<Icons.Cube color={Colors.grey3} size="medium" />
								</Box>
								<Text color={Colors.dark3}>"{value.name}"</Text>
							</Box>
							<Box align="center"  direction="row" pad="small">
								<Button label={<Text color="status-error">Remove</Text>} onClick={() => { this.deletePref(prefs, value, index) }} plain/>
							</Box>
						</Box>
					</Box>
				)
			})
			return rules;
		}
	}

	render() {
		return (
			<Box width="600px" background={Colors.grey3} pad="small">
				{this.getHighlightingOptions()}
			</Box>
		);
	}
}


class NewPreferences extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.err = undefined;
		this.state.open = undefined;
		this.state.curr_pref = undefined;
		this.state.new_prefs = [];
		this.state.color = undefined;
	}

	onOpen = () => this.setState({ open: true });
	onClose = () => {
		this.setState({ err: undefined, open: undefined, curr_pref: undefined, new_prefs: [], color: undefined, });
	} 

	onSubmit = () => {
		console.log(this.state.new_prefs);
		let new_prefs = this.state.new_prefs;
		let new_pref_obj = [];
		let userdata = JSON.parse(localStorage.getItem('userdata'));
		let old_prefs = userdata.preferences.ingredients; 
		new_pref_obj = old_prefs;

		new_prefs.forEach((value, index) => {
			new_pref_obj.push({ ingredient: new_prefs[index][0], color: new_prefs[index][1] });
		});

		userdata.preferences.ingredients = new_pref_obj;
		UserService.updateUserdata(userdata).then(() => {
			window.location.reload();
		})
	}

	setCurrPref = (value) => {
		this.setState({ curr_pref: value });
	}

	addNewPref = () => {
		let curr_pref = this.state.curr_pref;
		let new_prefs = this.state.new_prefs;
		let color = this.state.color;
		if (curr_pref == undefined || curr_pref == null || new_prefs.includes(curr_pref) || color === undefined) {
			this.setState({ err: "Invalid configuration. Did you miss something? " });
		} else {
			new_prefs.push([curr_pref.toLowerCase(), color]);
			this.setState({ err: undefined, new_prefs: new_prefs, curr_pref: undefined, color: undefined});
		}
	}

	getNewPrefs = () => {
		let new_prefs = this.state.new_prefs;
		let to_render = [];
		new_prefs.forEach((value, index) => {
			let curr_col = new_prefs[index][1];
			to_render.push(
				<Box direction="row" justify="between" gap="small" pad="small" width="100%" background={Colors.grey2}>
					<Box direction="row" gap="small">
						<Box background={Style.ColorIndex[curr_col]} pad="small" />
						<Text> Given name: "{new_prefs[index][0]}" </Text>
					</Box>
				</Box>
			)
		});
		return (
			<div>
				{to_render}
			</div>
		)
	}

	setColor = (index) => {
		this.setState({ color: index });
	}

	getError = () => {
		if (this.state.err === undefined) {
			return (
				<div />
			)
		} else {
			return (
				<Box pad="small" border={{ color: "status-error" }}>
					<Text size="12pt" color="status-error">{this.state.err}</Text>
				</Box>
			)
		}
	}

	renderModal = () => {
		return (
			<Layer position="center" modal onClickOutside={this.onClose} onEsc={this.onClose}>
				<Box width="600px" pad="medium">
					<Box direction="column" gap="small">
						<Box direction="row" justify="between" align="center">
							<Text size="24pt" color={Colors.dark3}>Create a new highlighting rule:</Text>
							<Button icon={<Icons.Close color={Colors.dark3} size="medium" />} onClick={this.onClose} />
						</Box>
						{this.getError()}
						<Box margin={{ top: "large" }} gap="small">
							<Text size="12pt">Enter name of ingredient to highlight:</Text>
							<Box direction="row" gap="small" align="center" pad={{ right: "large" }}>
								<TextInputBar onSet={this.setCurrPref} />
							</Box>
							<Box margin={{ top: "small" }} gap="small">
								<Text size="12pt">Select a color to highlight it:</Text>
								<Box direction="row" gap="small">
									<Button onClick={() => { this.setColor(1) }} plain>
										<Box height="20px" width="20px" background={Style.ColorIndex[1]} />
									</Button>
									<Button onClick={() => { this.setColor(2) }} plain>
										<Box height="20px" width="20px" background={Style.ColorIndex[2]} />
									</Button>
									<Button onClick={() => { this.setColor(3) }} plain>
										<Box height="20px" width="20px" background={Style.ColorIndex[3]} />
									</Button>
									<Button onClick={() => { this.setColor(4) }} plain>
										<Box height="20px" width="20px" background={Style.ColorIndex[4]} />
									</Button>
									<Button onClick={() => { this.setColor(5) }} plain>
										<Box height="20px" width="20px" background={Style.ColorIndex[5]} />
									</Button>
								</Box>
							</Box>
							<Text margin={{top: "small" }} size="12pt">Current Item:</Text>
							<Box align="center" border={{
								"size": "medium",
								"style": "dashed",
								"side": "all"
							}}
							pad="small" direction="row" gap="small">
								<Box border background={Style.ColorIndex[this.state.color]} pad="small" />
								{this.state.curr_pref}
								<Button label="add" onClick={this.addNewPref} />
							</Box>
						</Box>
						<Box>
							<Box margin={{ top: "small" }} gap="small">
								{this.getNewPrefs()}
							</Box>
						</Box>
						<Box margin={{ top: "medium"}} alignSelf="center" align="center" width="50%">
							<Button label="submit" onClick={this.onSubmit} />
						</Box>
					</Box>
				</Box>
			</Layer>
		)
	}

	render() {
		return (
			<Box direction="row" justify="center">
				<Box direction="row" align="center" background={Colors.primary} gap="small">
					<Button icon={
						<Box direction="row" gap="small" align="center">
							<Icons.AddCircle color={Colors.grey3} size="medium" />
							<Text size="12pt" color={Colors.grey3}>New Rule</Text>
						</Box>}
						onClick={this.onOpen} />
				</Box>
				{this.state.open && this.renderModal()}
			</Box>
		)
	}
}

class TextInputBar extends Component {
	state = { value: "" };

	ref = React.createRef();
	onChange = event => {
		this.setName(event.target.value);
		this.setState({ value: event.target.value });
	};

	setName = (name) => this.props.onSet(name);

	render() {
		const { value } = this.state;
		return (
			<Box width="100%">
				<TextInput ref={this.ref} value={value} onChange={this.onChange} />
			</Box>
		);
	}
}


const get_preferences = (preferences) => {

	let objs = Object.entries(preferences.ingredients);
	let ingredient_objs = [];
	objs.forEach((value, index) => {
		let to_push = { name: objs[index][1].ingredient, color: objs[index][1].color }
		ingredient_objs.push(to_push);
	});

	return ingredient_objs;
}

class SavedProducts extends Component {

	constructor(props) {
		super(props);

		this.state = {};
		// If page has acquired everything 
		this.state.loading = true;
		// If loading resulted in an error 
		this.state.loaderr = undefined;
		// If the user is logged in, get their userdata 
		this.state.userdata = JSON.parse(localStorage.getItem('userdata'));
		// User's authentication key 
		this.state.key = localStorage.getItem('auth');
		// A check to see if the user is authenticated 
		this.state.loggedin = (this.state.key !== undefined && this.state.key !== null);
		// List of product page ID's 
		this.state.productids = this.state.userdata.products;
		// List of product page information
		this.state.products = undefined;
	}

	componentDidMount() {
		let product_id_list = this.state.productids;
		let product_objs = [];
		let loaded_items = 0;

		if (product_id_list.length === 0) {
			let wait = setInterval(() => {
				clearInterval(wait);
				this.setState({ loading: false, products: product_objs });
			}, 500);
		} else {
			product_id_list.forEach((value, index) => {
				ScanService.getProductPage(product_id_list[index]).then(res => {
					product_objs.push({ pid: res.data.product_id, imgurl: res.data.img_url })
					loaded_items++;
					if (loaded_items == product_id_list.length) {
						this.setState({ loading: false, products: product_objs });
					}
				})
			})
		}
	}


	// The loading screen while the page awaits
	loading = () => {
		return (
			<Box align="center" justify="center" margin="large" border={{ size: "small" }} height="200px" width="600px">
				<GeneralLoader />
			</Box>
		)
	}

	updateUserData = () => {
		this.setState({
			userdata: JSON.parse(localStorage.getItem('userdata')),
			productids: this.state.userdata.products,
			products: undefined,
			loading: true,
		}, () => { window.location.reload() })
	}

	deleteProduct = (pid) => {
		let new_userdata = JSON.parse(localStorage.getItem('userdata'));
		let products = new_userdata.products;
		let index = products.indexOf(pid);
		if (index !== -1) {
			products.splice(index, 1);
		}
		new_userdata.products = products;
		UserService.updateUserdata(new_userdata)
			.then(() => {
				this.updateUserData();
			})
			.catch(e => { console.log(String(e)) })
	}

	productLinks = () => {
		if (this.state.products.length === 0) {
			return (
				<Box background={Colors.grey3} align="center" justify="center" width="600px" height="50px">
					<Text color={Colors.dark3} size="12pt"> You haven't saved anything yet ):</Text>
				</Box>
			)
		} else {
			let products = this.state.products;
			let pid_links = [];

			products.forEach((value, index) => {
				pid_links.push(
					<Box background={Colors.grey3} direction="row" align="center" justify="between" pad="15px" width="100%">
						<Box>
							<Image fit="cover" height="50px" width="50px" src={products[index].imgurl} />
						</Box>
						<Box direction="row" gap="small" align="center" > 
							<Link to={`/product/${products[index].pid}`} style={{ textDecoration: "none" }}>
								<Text size="12pt" color={Colors.primary} margin="small">Save {index}:</Text>
								<Text size="12pt" color={Colors.dark3}>{products[index].pid}</Text>
							</Link>
							<Button icon={<Icons.SubtractCircle color="status-error" size="medium" />} onClick={() => { this.deleteProduct(products[index].pid) }} />
						</Box>
					</Box>
				)
			});

			return (
				<Box background={Colors.grey2} align="center" justify="center" width="600px" pad="5px">
					{pid_links}
				</Box>
			)
		}

	}

	render() {
		if (this.state.loading === true) {
			return (
				<Box>{this.loading()}</Box>
			)
		}
		return (
			<Box direction="column" margin="medium" width="600px">
				<Box direction="column" gap="small">
					<Text size="20pt" color={Colors.dark3}>Saved Scan Results:</Text>
					{this.productLinks()}
				</Box>
			</Box>
		);
	}
}


// Loading for elements on the page
class GeneralLoader extends React.Component {
	state = { value: 10 };

	componentDidMount() {
		this.timer = setInterval(() => {
			const { value } = this.state;
			this.setState({ value: value < 100 ? value + 8 : 0 });
		}, 50);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		const { value } = this.state;
		return (
			<Meter
				margin="0"
				height="20px"
				width="20px"
				type="circle"
				size="small"
				values={[{ value, color: value > 10 ? `${Colors.grey1}` : `${Colors.grey3}` }]} />
		);
	}
}

export default withRouter(ProfilePage); 
