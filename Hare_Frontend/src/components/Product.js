
import React, { Component } from 'react';
import { Grommet, DataTable, grommet, Meter, TextInput, DropButton, Button, Box, Heading, Menu, Paragraph, Carousel, Accordion, AccordionPanel, Text, Image, Distribution, Layer } from 'grommet';
import * as Icons from 'grommet-icons';
import { withRouter, Redirect, Route, Link, Router, BrowserRouter } from 'react-router-dom';

import Style from './styles/Style';
import Colors from './styles/Color';
import AuthService from './actions/AuthService';
import UserService from './actions/UserService';
import ScanService from './actions/ScanService';



// ---------------------------------// ---------------------------------// ---------------------------------
// ---------------------------------// ---------------------------------// ---------------------------------

class ProductPage extends Component {

	// All necessary states and data declared here
	constructor(props) {
		super(props);
		this.state = {};

		// If page has acquired everything 
		this.state.loading = true;
		// If loading resulted in an error 
		this.state.loaderr = undefined;
		// The ID of this product page 
		this.state.product_id = this.props.match.params.productId;
		// A check to see if the user is authenticated 
		this.state.loggedin = localStorage.getItem('auth');
		// If the user is logged in, get their userdata 
		this.state.userdata = JSON.parse(localStorage.getItem('userdata'));
		// Check if this productID has been saved before (by the user)
		this.state.saved = undefined;
		// Product Results page data 
		this.state.page = undefined;
		// img url 
		this.state.imgurl = undefined;
		// List of ingredients by category 
		this.state.ingredients = undefined;
		// List of ingredients that were not found
		this.state.not_found = undefined;
	}

	// Data is fetched once react is mounting 
	componentDidMount() {
		ScanService.getProductPage(this.state.product_id)
			.then(res => {
				let isSaved = checkIfPageSaved(this.state);
				let pageIngredients = getIngredients(res.data.contents);
				let notFound = getNotFound(res.data.contents);
				let page = res.data;
				if (pageIngredients === undefined || page === undefined) {
					this.setState({ loaderr: "Invalid data during mount provided" });
				} else {
					this.setState({
						saved: isSaved, ingredients: pageIngredients,
						imgurl: page.img_url, not_found: notFound, page: page
					});
					console.log("LOADING COMPLETE: OPENING PAGE");
					this.setState({ loading: false });
				}
			})
			.catch(e => {
				this.setState({ loaderr: e });
			});
	}

	// The loading screen while the page awaits
	loadingScreen = () => {
		if (this.state.loaderr !== undefined) {
			return (
				<Box align="center" gap="small" fill>
					<Box height="20%" />
					<Box align="center" pad="medium" gap="medium" border={{ color: "status-error", size: "medium" }}>
						<Icons.Alert size="xlarge" color="status-error" />
						<Text color="status-error">Failure loading: {this.state.product_id} <br /> <br />
							<Link to='/upload' style={{ textDecoration: "none" }}>
								<Box direction="row">
									<Icons.LinkPrevious color="status-error" size="medium" />
									<Box width="10px" />
									<Text color="status-error">Go back</Text>
								</Box>
							</Link>
						</Text>
					</Box>
				</Box>
			)
		} else {
			return (
				<Box align="center" gap="large" fill>
					<Box height="25%" />
					<PreviewLoader />
					<Text color={Colors.grey1}>Loading page: {this.state.product_id}</Text>
				</Box>
			)
		}
	}

	updateSave = () => {
		this.setState({ saved: true });
	}
	// The icon which you can click to save the page
	saveIcon = () => {
		if(this.state.loggedin === undefined || this.state.loggedin === null) { 
			return(<div />);
		}  else if(this.state.saved === true) { 
			return(
				<Box direction="row" align="center" justify="center">
					<Icons.StatusGood size="large"	color="#00C781" />
					<Box width="10px" />
					<Text color="#00C781" size="12pt">Saved!</Text>
				</Box> 
			)
		} else { 
			return ( 
				<Box>
					<SaveModal updateSave={this.updateSave} product_id={this.state.product_id}/>
				</Box> 
			)
		}
	}

	// Main contents of the page 
	renderPage = () => { 
		return(
			<Box direction="column" pad="medium" align="center" width="625px" fill>
				<Box direction="row" gap="medium" justify="between">
					<ImagePreview img={this.state.imgurl} />
					<IngredientDistribution data={this.state}/>
				</Box>
				<Box margin="medium" width="625px">
					<CategoryAccordion {...this.state}/>
				</Box>
			</Box>
		)
	}

	// Display not found ingredients
	notFound = () => { 
		console.log(this.state.not_found); 
		let not_founds = []; 
		this.state.not_found.forEach( (v,i) => {
			not_founds.push(this.state.not_found[i].name);
		}); 
		let output = not_founds.join(', ');
		
		return(
			<Box direction="column" align="center" gap="small"> 
				<Icons.DocumentMissing color={Colors.dark3} size="medium" />
				<Text size="12pt" color={Colors.dark3}> The following items could not be found in our database: </Text>
				<Text size="8pt" color={Colors.dark3}>{output}</Text>
			</Box>
		)
	}

	// Primary render call. Updates whole page
	render() {
		let { loading } = this.state;
		if (loading === true) {
			return (
				<Box fill>
					{loading && this.loadingScreen()}
				</Box>
			)
		} else {
			return (
				<div>
					<Box margin="large" justify="center" align="center">
						<Box justify="between" width="100%" direction="row">
							<Box width="33%" justify="center" align="start" pad={{ left: "large" }}>
								<Link to='/upload'>
									{<Icons.LinkPrevious color={Colors.dark3} size="large" justify="left" align="left" />}
								</Link>
							</Box>
							<Box width="33%" justify="center" align="center">
								{Style.Title("Scan Results:")}
							</Box>
							<Box direction="row" width="33%" justify="start" align="end" pad={{ left: "medium" }} >
								<Box direction="column" align="center" justify="end">
									{this.state.loggedin && this.saveIcon()}
								</Box>
							</Box>
						</Box>
						<div>
							<Text size="12pt" color={Colors.grey1}> Not sure how it works? You can find a guide </Text>
							<Text size="12pt" color={Colors.primary}>here</Text>
						</div>
						{/* MAIN PAGE HERE */}
						{this.renderPage()}
						{this.notFound()}
						<Box direction="row" justify="start" width="23.5%">
							<Box width="10%" />
						</Box>
					</Box>
				</div>
			)
		}

	}

}


// ---------------------------------// ---------------------------------// ---------------------------------

// True or false return if page has already been saved by logged in user. 
const checkIfPageSaved = (state) => {
	let userdata = state.userdata;
	let product_id = state.product_id;
	if (userdata == null || userdata == undefined) {
		return false;
	} else if (product_id === undefined) {
		return false;
	}
	let saved_products = userdata.products;
	if (saved_products.length == 0) {
		return false;
	} else if (saved_products.includes(product_id)) {
		return true;
	}
	return false;
}

// Gets ingredients cleaner from productpage data 
const getIngredients = (contents) => {
	if (contents.length == 0) {
		return undefined;
	}

	let ingredients = [];
	Object.keys(contents).forEach((value, index) => {
		if (String(value) !== "Not Found") {
			ingredients[value] = contents[value];
		}
	})
	return ingredients;
}

// Gets not founds that are rendered at the bottom of the page 
const getNotFound = (contents) => {
	if (contents.length == 0) {
		return [];
	}

	let ingredients = [];
	Object.keys(contents).forEach((value, index) => {
		if (String(value) === "Not Found") {
			ingredients = contents[value];
		}
	})
	return ingredients;
}

// Loading bar for the page 
class PreviewLoader extends React.Component {
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
				height="100px"
				width="100px"
				type="circle"
				size="small"
				values={[{ value, color: value > 10 ? `${Colors.primary}` : `${Colors.primary}` }]} />
		);
	}
}

// Ingredient Accordion without preferencing flair 
class CategoryAccordion extends Component { 

	constructor(props) { 
		super(props); 
		this.state = {};
		// If page has acquired everything 
		this.state.loading = true;
		// A check to see if the user is authenticated 
		this.state.loggedin = this.props.loggedin; 
		console.log("LOGGED IN:", this.state.loggedin);
		// If the user is logged in, get their userdata 
		this.state.userdata =  this.props.userdata;
		// List of ingredients by category 
		this.state.ingredients = this.props.ingredients;
		// Panels rendered in the accordion
		this.state.panels = []; 
		// Ingredient preferences 
		if(this.state.loggedin != null && this.state.loggedin != undefined) { 
			this.state.preferences = get_preferences(this.state.userdata.preferences);
			// Preference names 
			let prefs = []
			this.state.preferences.forEach((v, i) => { 
				prefs.push(this.state.preferences[i].name);
			})
			this.state.pref_names = prefs;
		}
	}

	componentDidMount() {
		let mounting = setInterval( () => { 
			clearInterval(mounting);
			this.setState({ loading: false});
		}, 500); 
	}

	getHighlightedBubbles = (category) => { 
		let bubbles = []; 
		let highlights = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0};
		
		category.forEach((v, i) => { 
			if(this.state.pref_names.includes(category[i].name)) { 
				let found_item = this.state.preferences.find( pref => pref.name === category[i].name);
				highlights[found_item.color]++; 
			}
		});

		Object.keys(highlights).forEach((value, index) => { 
			if(highlights[value] != 0) { 
				bubbles.push(
					<Box background={Style.ColorIndex[value]}
						width="20px"
						height="20px"
						round
						align="center" justify="center">
						<Text size="12pt" color={Colors.grey3}>
							{highlights[value]}
						</Text>
					</Box>
				)
			}
		});
		return (
			<Box direction="row" gap="small"> 
				{bubbles}
			</Box>
		)
	}
	
	getPreferencedPanels = () => { 
		console.log("Getting preferenced panels.");
		console.log(this.state.loggedin);
		let contents = Object.entries(this.state.ingredients);
		let panels = [];
		contents.forEach((value, index) => { 
			let str = `${contents[index][0]} (${contents[index][1].length})`;
			let label = (<Box direction="row" gap="medium" align="center" height="20pt"> 
								<Text color={Colors.dark3}>{str}</Text>
								<Box direction="row" pad="xsmall"> 
									{this.getHighlightedBubbles(contents[index][1])}
								</Box>
						</Box>);

			panels.push(
			<div>
				<AccordionPanel pad="small" background={Colors.grey3} label={label}>
					<IngredientButtons content={contents[index][1]} {...this.props} />
				</AccordionPanel>
			</div>
			);
		});
		return panels; 
	}

	getPanels = () => { 
		if(this.state.loggedin !== null && this.state.loggedin !== undefined) { 
			return this.getPreferencedPanels();
		} else { 
			let contents = Object.entries(this.state.ingredients);
			let panels = [];
			contents.forEach((value, index) => { 
				let label = <Text color={Colors.dark3}>{contents[index][0]} {`(${contents[index][1].length})`}</Text>;
				panels.push(
				<div>
					<AccordionPanel pad="small" background={Colors.grey3} label={label}>
						<IngredientButtons content={contents[index][1]} {...this.props} />
					</AccordionPanel>
				</div>
				);
			});
			return panels; 
		}
	}

	render() { 
		if(this.state.loading === true) { 
			return(
				<Box width="800px" height="400px" border={{ size: "small", color: `${Colors.grey1}`}} align="center" justify="center">
					<GeneralLoader />
				</Box>
			)
		} else { 
			return ( 
				<Box>
					<Box margin={{ bottom: "20px", top: "10px" }} direction="row" align="center" justify="center" >
						<Box round background={Colors.grey1} width="5px" height="5px"/>
						<Box width="5px" /> 
						<Box round background={Colors.grey1} width="5px" height="5px"/>
						<Box width="5px" /> 
						<Box round background={Colors.grey1} width="5px" height="5px"/>
					</Box>
					<Box direction="column" margin={{ bottom: "small" }}>
						<Text textAlign="center" size="10pt" color={Colors.primary}>
							Information about specific ingredients by category.
						</Text>
						<Text textAlign="center" size="10pt" color={Colors.primary}>
							Click on a category, and ingredient to find out more about what we found.
						</Text>
					</Box>
					<Accordion margin={{top: "medium"}}>
						{this.getPanels()}
					</Accordion>
				</Box>
			);
		}
	}

}

class IngredientButtons extends Component { 

	constructor(props) { 
		super(props);
		this.state = {};
		// If page has acquired everything 
		this.state.loading = true;
		// A check to see if the user is authenticated 
		this.state.loggedin = this.props.loggedin; 
		// If the user is logged in, get their userdata 
		this.state.userdata =  this.props.userdata;
		// List of ingredients by category 
		this.state.ingredients = this.props.ingredients;
		if(this.props.loggedin !== undefined && this.props.loggedin !== null) {
			// Ingredient preferences 
			this.state.preferences = get_preferences(this.state.userdata.preferences);
			// Preference names 
			let prefs = []
			this.state.preferences.forEach((v, i) => { 
				prefs.push(this.state.preferences[i].name);
			})
			this.state.pref_names = prefs;
		}
	}

	renderIngredientButtons = () => { 
		if(this.state.loggedin == null 
			|| this.state.loggedin == undefined
			|| this.state.userdata == undefined 
			|| this.state.userdata == null) { 
				return this.renderIngredientsNormally();
		} else { 
			return this.renderIngredientsHighlighted();
		}
	}

	// TODO:
	renderIngredientsHighlighted = () => { 
		let contents = this.props.content; 
		let buttons = [];
		contents.forEach((value, index) => { 
			let found_pref = undefined; 
			if(this.state.pref_names.includes(contents[index].name)) { 
				let found_item = this.state.preferences.find( pref => pref.name === contents[index].name);
				found_pref = found_item.color;
			}
			buttons.push(
				<div> 
					<IngredientModal name={contents[index].name} desc={contents[index].desc} pref={found_pref}/>
				</div> 
			)
		})
		return buttons;
	}

	renderIngredientsNormally = () => { 
		let contents = this.props.content; 
		let buttons = [];
		contents.forEach((value, index) => { 
			buttons.push(
				<div> 
					<IngredientModal name={contents[index].name} desc={contents[index].desc}/>
				</div> 
			)
		})
		return buttons;
	}

	render() {
		return( 
			<Box direction="row" gap="small" pad={{ left: "small", right: "small", top: "medium", bottom: "medium"}} wrap fill> 
				{this.renderIngredientButtons()}
			</Box>
		);
	}
}

class IngredientModal extends Component { 

	constructor(props) {
		super(props);
		this.state = {}; 
		this.state.open = undefined; 
		this.state.name = this.props.name; 
		this.state.desc = this.props.desc; 
		this.state.pref = this.props.pref;
	}

	onOpen = () => this.setState({ open: true });
	onClose = () => this.setState({ open: undefined });

	renderModal = () => {
		return ( 
		<Layer position="center" modal onClickOutside={this.onClose} onEsc={this.onClose}>
			<Box direction="column" pad="medium" gap="medium"> 
				<Box direction="row" justify="between"> 
				<Box direction="row" gap="small" align="center" justify="center">
					<Icons.CircleInformation size="large" color={Colors.dark3} />
					<Text size="24pt" color={Colors.dark3}>Ingredient: "{this.state.name}"</Text> 
				</Box>
					<Button icon={<Icons.Close color={Colors.dark3} size="medium"/>} onClick={this.onClose} />
				</Box>
				<Box background={Colors.grey2} pad="small" round> 
					<Text size="12pt" color={Colors.dark3}>{this.state.desc}</Text>
				</Box>
			</Box>
		</Layer>
		)
	}

	render() {
		let bg = Colors.grey3; 
		let tc = Colors.dark3;
		if(this.state.pref != null || this.state.pref != undefined) { 
			bg = Style.ColorIndex[this.state.pref];
			tc = Colors.grey3;
		}
		return (
			<Box background={bg} pad="xsmall" margin={{top: "small", bottom: "small"}}>
				<Button
					label={<Text size="8pt"
						color={tc}>{this.state.name}
					</Text>}
					onClick={this.onOpen} plain />
				{this.state.open && this.renderModal()}
			</Box>
		)
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

// Renders a distributions of ingredients by category and preference. 
class IngredientDistribution extends Component { 

	constructor(props) { 
		super(props); 
		this.state = {}; 
		this.state.loading = true; 
		this.state.contents = this.props.data.ingredients; 
		this.state.ranked_categories = undefined; 
		this.state.values = undefined; 
	}

	componentDidMount() {
		let mounting = setInterval(() => {
			clearInterval(mounting);
			let contents = Object.entries(this.state.contents); 
			contents.sort((a,b) => { 
				return b[1].length - a[1].length;
			});
			let distributionContents = [];
			let distributionValues = []; 
			contents.forEach((value, index) => { 
				if(distributionContents.length < 5) { 
					let tuple = [contents[index][0], contents[index][1].length];
					distributionContents.push(tuple);
				}
			});
			distributionContents.forEach( (value, index) => { 
				let item = { value: distributionContents[index][1], label: distributionContents[index][0]};
				distributionValues.push(item); 
			});
			this.setState({ ranked_categories: distributionContents, values: distributionValues, loading: false });
		}, 500);
	}

	loadingBar = () => { 
		return( 
			<Box border={{ size: "small", color: `${Colors.grey1}`}} align="center" justify="center" height="200px" width="400px" >
				<GeneralLoader />
			</Box>
		)
	}

	render() { 
		if(this.state.loading === true) { 
			return( 
				<div>
					{this.loadingBar()}
					<Box direction="row" margin={{ top: "small"}} >
						<Icons.CircleInformation size="small" color={Colors.grey1}/>
						<Box width="10px"/>
						<Text size="8pt" color={Colors.grey1}>
							Distribution of ingredients by category (Top 5 included)
						</Text>
					</Box>
				</div>
			)
		} else { 
			return( 
				<div>
					<Distribution height="200px" width="400px" values={this.state.values}>
						{value => (
							<Box pad="small" background={Colors.primary} fill>
								<Text size="8pt" color={Colors.grey3}>{value.value} {value.label}</Text>
							</Box>
						)}
					</Distribution>
					<Box direction="row" margin={{ top: "xsmall"}} >
						<Icons.CircleInformation size="small" color={Colors.grey1}/>
						<Box width="10px"/>
						<Text size="8pt" color={Colors.grey1}>
							Distribution of ingredients by category (Top 5 included)
						</Text>
					</Box>
				</div>
			)
		}
	}
}

// Click on an image to get the full thing.
class ImagePreview extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.state.imgurl = this.props.img;
	}

	onOpen = () => this.setState({ open: true });
	onClose = () => this.setState({ open: undefined });


	renderModal = () => {
		return (
			<Layer position="center" modal onClickOutside={this.onClose} onEsc={this.onClose}>
				<Box direction="column" gap="small">
						<Box direction="row" margin={{ top: "xsmall", left: "small", right: "small"}} >
							<Icons.CircleInformation size="small" color={Colors.grey1} />
							<Box width="10px" />
							<Text size="8pt" color={Colors.primary}>
								This is the entire image we have associated with these scan results.
							</Text>
						</Box>
					<Box direction="row" justify="between">
						<Image alt="Preview not Found" src={this.state.imgurl} />
					</Box>
				</Box>
			</Layer>
		);
	}

	render() {
		const { open } = this.state;
		return (
			<Box>
				<Button onClick={this.onOpen}> 
					<Image fit="cover" alt="Preview not Found" src={this.state.imgurl} height="200px" width="200px"/>
				</Button>
				{open && this.renderModal()}
				<Box direction="row" margin={{ top: "2"}} >
						<Icons.CircleInformation size="small" color={Colors.grey1}/>
						<Box width="10px"/>
						<Text size="8pt" color={Colors.grey1}>
							Image Scanned
						</Text>
					</Box>
			</Box>
		);
	}

}

// Save button
class SaveModal extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.state.loading = false; 
		this.state.err = undefined; 
		this.state.saved_name = undefined;
		this.state.userdata = JSON.parse(localStorage.getItem('userdata'));
		this.state.saved_id = this.props.product_id;
		this.state.updateSave = this.props.updateSave;
	}

	onOpen = () => this.setState({ open: true });
	onClose = () => this.setState({ open: undefined });

	updateName = (name) => {
		this.setState({ saved_name: name });
	}

	getErrorMsg = () => { 
		return (
			<Box direction="row" 
			align="center"
			justify="between"  
			background="#ff9999" 
			border={{ color: "red" }} 
			wrap pad="small">
				<Text  color="red" size="12pt">{this.state.err}</Text>
				<Button icon={<Icons.Close color="red" />} onClick={() => { this.setState({ err: undefined }) }} />
			</Box>
		)
	}

	sendSave = () => {
		this.setState({ loading: true });
		UserService.saveProduct(this.state.saved_name, this.state.userdata, this.state.saved_id)
		.then(res => {
			this.setState({ loading: false, err: undefined });
			this.state.updateSave();
			this.onClose();
			return;
		})
		.catch(e => { 
			this.setState({ loading: false, err: String(e)});
		})
	}

	renderModal = () => {
		if(this.state.loading === true) { 
			return ( 
				<Box align="center" justify="center"> 
					<GeneralLoader />
				</Box>
			)
		} else { 
			return (
				<Layer position="center" modal onClickOutside={this.onClose} onEsc={this.onClose}>
					<Box direction="column" pad="medium" gap="medium">
						<Box direction="row" justify="between">
							<Text size="24pt" color={Colors.dark3}> Save Scan Results</Text>
							<Button icon={<Icons.Close color={Colors.dark3} />} onClick={this.onClose} />
						</Box>
						<Text>Save as: </Text>
						<TextInputBar onSet={this.updateName} />
						{this.state.err && this.getErrorMsg()}
						<Button color={Colors.primary} label={<Text color={Colors.primary}>Submit</Text>} onClick={this.sendSave} />
					</Box>
				</Layer>
			);
		}
	}

	render() {
		const { open } = this.state;
		return (
			<Box align="center" justify="center">
				<Button direction="column" margin="none" 
				icon={<Icons.Pin size="large" color={Colors.dark3} />} 
				label={<Text size="12pt" color={Colors.primary}>Save<br/>results</Text>}
				onClick={this.onOpen} plain />
				{open && this.renderModal()}
			</Box>
		);
	}

}

// Generic text input bar, takes in argument "onSet" as a function to 
// update text somewhere.
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
			<Box width="medium">
				<TextInput ref={this.ref} value={value} onChange={this.onChange} />
			</Box>
		);
	}
}

const get_preferences = (preferences) => { 

	let objs = Object.entries(preferences.ingredients);
	let ingredient_objs = []; 
	objs.forEach( (value, index) => { 
		let to_push = { name: objs[index][1].ingredient, color: objs[index][1].color}
		ingredient_objs.push(to_push);
	});

	return ingredient_objs; 
}

export default withRouter(ProductPage); 
