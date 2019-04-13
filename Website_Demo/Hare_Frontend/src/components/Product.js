import React, { Component } from 'react'; 
import { 
	Grommet, 
	grommet, 
	DropButton,
	Button, 
	Box, 
	Heading, 
	Menu, 
	Paragraph, 
	Carousel, 
	Accordion, 
	AccordionPanel, 
	Text, 
	Image, 
	Distribution, 
	Layer
} from 'grommet';

import * as Icons from 'grommet-icons';
import { 
	withRouter, 
	Route, 
	Link, 
	Router, 
	BrowserRouter 
} from 'react-router-dom';

import Colors from './Color'; 
import AuthService from './AuthService' 

const Title = (contents) => { 
	return(
		<Text size="36pt" color={Colors.dark3}> 
			{contents}
		</Text> 
	); 
} 

const subTitle = (contents, size) => {
	let ptsize = `${size}pt`
	return( 
		<Text size={ptsize} color={Colors.grey1}> 
			{contents}
		</Text> 
	); 
} 

// TODO: 
const cameraWindow = () => { 
	return( 
		<Box background={Colors.grey1} pad="10%">
			<Icons.Camera color={Colors.grey3} size="large"/>
		</Box> 
	); 
} 

// TODO: 

const horizontalSpacer = (amt) => { 
	return( 
		<Box width="100%" height={amt}> 
		</Box> 
	); 
} 

class SaveModal extends Component {

	state = {}; 

	onOpen = () => this.setState({ open: true });
	onClose = () => this.setState({ open: undefined });

	sendSave = () => {
		// TODO 
	}

	renderModal = () => { 
		return(
			<Layer position="center" modal onClickOutside={this.onClose} onEsc={this.onClose}>
				<Box direction="row" pad={{ left: 'medium', right: 'medium', top: 'medium'}} justify="between">
					<Text size="24pt" color={Colors.dark3}> Save Ingredient</Text>
					<Button icon={<Icons.Close color={Colors.dark3} />} onClick={this.onClose}/>
				</Box>
			</Layer>
		);
	}

	render() {
		const { open } = this.state;
		return (			
			<div>
				<Button icon={<Icons.Save color={Colors.dark3}/>}  onClick={this.onOpen}  plain/>
				{ open && this.renderModal()}
			</div>
		);
	}

}

class IngredientModal extends Component {

	state = {}; 

	componentDidMount() { 
		let data = this.getIngredientData(); 
		this.setState({ ingredientname: data.name, ingredientdesc: data.desc});
	} 

	getIngredientData = () => { 
		return this.props.ingredient; 	
	}

	getColor = () => {
		if(this.props.color != undefined) {
			return this.props.color; 
		} else { 
			return;
		}	
	} 

	onOpen = () => this.setState({ open: true });
	onClose = () => this.setState({ open: undefined });

	renderModal = () => { 
		return(
			<Layer position="center" modal onClickOutside={this.onClose} onEsc={this.onClose}>
				<Box direction="row" pad={{ left: 'medium', right: 'medium', top: 'medium'}} justify="between">
					<Text size="24pt" color={Colors.dark3}> Ingredient: {this.state.ingredientname}</Text>
					<Button icon={<Icons.Close color={Colors.dark3} />} onClick={this.onClose}/>
				</Box>
				<Box pad="medium"> 
					<Text size="12pt" > {this.state.ingredientdesc}</Text> 
				</Box> 
			</Layer>
		);
	}

	render() {
		const { open } = this.state;
		return (			
			<Box>
				<Button label={<Text size="10pt"  color={this.getColor()}>{`${this.state.ingredientname}, `}</Text>}  onClick={this.onOpen} plain />
				{ open && this.renderModal()}
			</Box>
		);
	}

}


const renderIngredientIcon = (preferences, ingredientlist) => { 
	let ingredientbuttons = []; 
	let pref_colors = {
		0: "", 
		1: "#FF3333",
		2: "#33D1FF", 
		3: "#33D1FF", 
		4: "#33D1FF", 
		5: "#33D1FF", 
	} 
	let match = false;
	let color = "";
	let col_index = 0; 
	ingredientlist.forEach(function (item) {
		if(preferences != null ) {
			match = false; 
			Object.keys(preferences.special).forEach(function(key, index) {
				if(preferences.special[key].name == item.name) { 
					match = true;
					col_index = preferences.special[index].color;
					color = pref_colors[col_index]; 
				}
			});
			
			if(match == true) { 
				ingredientbuttons.push(<IngredientModal ingredient={item} color={color} />); 
			} else {
				ingredientbuttons.push(<IngredientModal ingredient={item} />); 
			}
		} else { 
			ingredientbuttons.push(<IngredientModal ingredient={item} />);
		} 
	});

	return(
		<div>
			{ingredientbuttons}
		</div> 
	); 
} 

class ProductPage extends Component { 

	constructor() { 
		super(); 
		let authval = AuthService.isAuthenticated(); 
		this.state = {}; 
		this.state.auth = authval;
	} 

	componentDidMount() {
		let idnum = this.props.location.pathname; 
		idnum = idnum.split("/");
		idnum = idnum[2];
		this.setState({ product_id: idnum}); 
	} 


	getImageB64 = () => {
		const obj = JSON.parse(localStorage.getItem("000000000000000000000000")); 
		const binary = obj.img_url; 
		return binary; 
	} 


	renderIngredientsNormally = () => {
		const obj = JSON.parse(localStorage.getItem("000000000000000000000000")); 
		let ingredients = obj.contents; 
		let panels = []; 
		Object.keys(ingredients).forEach(function(key,index) {
			if(ingredients[key].length != 0 && key != null) { 
				panels.push( 
					(
						<AccordionPanel label={key}>
							{renderIngredientIcon(null, ingredients[key])}  
						</AccordionPanel> 
					)
				) 
			} 
		});

		return( 
			<Accordion> 
				{panels}	
			</Accordion> 
		); 
	} 

	renderIngredientsPreferenced = () => { 
		const product_obj = JSON.parse(localStorage.getItem("000000000000000000000000")); 
		const userdata = JSON.parse(localStorage.getItem("userdata"));
		let ingredients = product_obj.contents;
		let panels = []; 

		Object.keys(ingredients).forEach(function(key, index) { 
			if(ingredients[key].length != 0 && key != null) { 
				panels.push( 
					<AccordionPanel label={key}> 
						{renderIngredientIcon(userdata.preferences, ingredients[key])} 
					</AccordionPanel> 
				); 
			} 
		}); 

		return( 
			<Accordion>		
				{panels} 
			</Accordion> 
		); 
	} 

	renderDistribution = () => {

		let dist_content = [];
		const obj = JSON.parse(localStorage.getItem("000000000000000000000000")); 
		let ingredients = obj.contents;
		let max = 0; 
		Object.keys(ingredients).forEach(function(key,index) {
			let curr_obj = {}; 
			if(ingredients[key].length != 0 && key != null) { 
				curr_obj = { value: Number(ingredients[key].length), label: String(key) };
				dist_content.push(curr_obj);
				max += ingredients[key].length; 
			} 
		});
		dist_content.sort(); 

		return( 
			<Box width="400px" > 
				<Distribution width="400px" values={dist_content}> 
				{ value => (
					<Box pad="small" background={Colors.primary} fill>
						<Text size="12pt" color={Colors.grey3}>{value.value} {value.label}</Text>
					</Box>
				)}  
			</Distribution>
		</Box> 
		);
	} 

	renderProductPage = () => {
		return( 
			<Box direction="column" pad="medium" align="center" width="625px" fill>
				<Box direction="row" gap="medium" justify="between"> 
					<Carousel pad="medium">
						<img alt="Image not found" src={`${this.getImageB64()}`} height="200px" width="200px"/>
					</Carousel>
					{this.renderDistribution()}
				</Box>

				<Box margin="medium"  width="625px">
					{eval(this.state.auth) ? (this.renderIngredientsPreferenced()): ( this.renderIngredientsNormally() )}
				</Box>
			</Box> 
		); 
	} 



	render() { 
		return(
			<div>
				<Box margin="large" justify="center" align="center">
					<Box justify="between" width="100%" direction="row"> 
						<Box width="33%"  justify="center" align="start"   pad={{ left: "large" }}>
							<Link to='/upload'>
								{<Icons.LinkPrevious color={Colors.dark3} size="large" justify="left" align="left"/>}
							</Link>
						</Box> 
						<Box width="33%" justify="center" align="center"> 
							{Title("Scan Results:")}
						</Box> 
						<Box direction="row" width="33%" justify="start" pad={{ left: "medium" }}>
							<Box direction="column" align="center"> 
								{eval(this.state.auth) && <SaveModal />}
							</Box> 
						</Box> 
					</Box> 
					<div> 
						<Text size="12pt" color={Colors.grey1}> Not sure how it works? You can find a guide </Text> 
						<Text size="12pt" color={Colors.primary}> <a href='/help'>here</a></Text>
					</div> 
					{this.renderProductPage()}
					<Box direction="row" justify="start" width="23.5%"> 
						<Box width="10%"/>
					</Box> 
				</Box>
			</div>
		);	
	}
} 

export default withRouter(ProductPage); 
