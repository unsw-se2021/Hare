// The page that users can use to upload an image, open to guests and users 
// Primary component: UploadPage
import React, { Component, createRef } from 'react'; 
import { Grommet, grommet, Box, Button, Heading, Menu, Paragraph, Text, Meter, Image, Layer, Drop} from 'grommet';
import * as Icons from 'grommet-icons';
import { Switch, BrowserRouter as Router, browserHistory, Redirect, withRouter, Link  } from 'react-router-dom';

// IMPORT: Style components 
import Style from './styles/Style';
import Colors from './styles/Color';
// IMPORT: Action scripts 
import AuthService from './actions/AuthService';
import ScanService from './actions/ScanService'; 
// IMPORT: React Pages 
import Home from './Home'; 

class UploadPage extends Component { 

	// ---------------------------------	
	// LIFE CYCLE MODIFIERS
	// ---------------------------------

	constructor(props) { 
		super(props); 
		this.state = {};
		// User wants to start over  
		this.state.refresh = false; 
		// File location 
		this.state.file = undefined; 
		// File base64 data 
		this.state.imgurl = undefined; 
		// Scan Result id number
		this.state.product_id = undefined; 
		// If something goes wrong, this creates a msg 
		this.state.error = undefined;
	}

	// ---------------------------------
	// STATE HANDLERS
	// ---------------------------------

	// Take in object newState and set this state to it. 
	// Used for children to modify page stuff.
	modifyState = (newState) => { 
		this.setState(newState);
	}

	// ---------------------------------
	// EVENT HANDLERS 
	// ---------------------------------

	uploadHandler = event => {
		let reader = new FileReader(); 		
		let file = event.target.files[0];
		this.setState({ error: undefined});
		// Try the code below, if it fails, produce an error msg
		try { 
			// If too large, throw err 
			if((file.size / 1024 / 1024) > 5) { 
				throw("File is too large (> 5mb)"); 
			}
			// Convert to b64
			reader.readAsDataURL(event.target.files[0]); 
			this.setState({ file: event.target.files[0] });
			reader.onload = (e) => {
				// Set b64 image data
				this.setState({ imgurl: e.target.result }); 
				ScanService.getProductID(e.target.result)
				.then(res => { 
					if(res.data.error !== undefined) { 
						throw(res.data.error); 
					}
					this.setState({ product_id: res.data.product_id });
				})
				.catch(e => { 
					this.setState({ product_id: undefined, imgurl: undefined, file: undefined, error: String(e)});
					throw(e);
				});
			} 
		} catch (e) { 
			console.log("ERROR: uploadHandler: ", e); 
			this.setState({ product_id: undefined, imgurl: undefined, file: undefined, error: String(e)});
			this.render();
		}
	}	

	errhandler = () => { 
		if(this.state.error !== undefined) { 
			return ( 
				<Box direction="row" justify="between" margin={{ top:"medium", bottom: "small"}} background="#ff9999" width="325px" border= {{ color: "red" }} round="xsmall">
					<Box direction="row" gap="small" align="center" pad="small" >
						<Icons.Alert color="red" /><Text color="red" size="12pt">{this.state.error}</Text>
					</Box>
					<Button icon={<Icons.Close color="red"  />} onClick={() => {this.setState({error: undefined})}} />
				</Box>
			)
		} else { 
			return <div />
		}
	}

	// ---------------------------------
	// COMPOSED OBJECTS
	// ---------------------------------

	// Image preview, which is clickable if an image is uploaded
	// So that it reveals a crop modal. 
	imagePreview = () => { 
		if(this.state.file === undefined) { 
			// File submitted but base64 still encoding...
			return ( 
				<Box background={Colors.grey1} pad="10%">
					<Icons.Camera color={Colors.grey3} size="large"/>
				</Box> 
			);
		} else if(this.state.imgurl === undefined){ 
			// Base 64 loaded.
			return ( 
				<Box background={Colors.grey1} pad="10%">
					<PreviewLoader />
				</Box> 
			);
		} else { 
			// Nothing submitted or loaded
			return ( 
				<ImagePreview inherit={this.state} modify={this.modifyState}/>
			);
		}
	}

	uploadButton = () => { 
		return (
			<Box width="45%" background={Colors.primary}>
				<input type="file" name="file" id="file" onChange={this.uploadHandler} style={{ display: 'none' }} />
				<label htmlFor="file">
					<Box direction="row" gap="small" pad="small" align="center" justify="center" style={{ cursor: 'pointer' }}>
						<Icons.Upload color={Colors.grey3} /> <Text color={Colors.grey3}>Upload</Text>
					</Box>
				</label>
			</Box>
		);
	}

	submitButton = () => {
		if (this.state.file === undefined) {
			return (
				<Box direction="row" background={Colors.primary} pad="small" width="45%" justify="between" align="center">
					<Icons.Send color={Colors.grey1} size="medium" />
					<Text color={Colors.grey1}> Submit</Text>
				</Box>
			);
		} else if (this.state.product_id === undefined) {
			return (
				<Box direction="row" background={Colors.primary} pad="small" width="45%" justify="between" align="center">
					<SubmitLoader />
					<Text color={Colors.grey3}> Loading</Text>
				</Box>
			);
		} else {
			return (
				<Box direction="row" background={Colors.primary} pad="small" width="45%" justify="between" align="center">
					<Icons.Send color={Colors.grey3} size="medium" />
					<Link to={`product/${this.state.product_id}`} product_id={this.state.product_id} style={{ textDecoration: 'none' }}>
						<Text color={Colors.grey3}> Submit</Text>
					</Link>
				</Box>
			);
		}
	}

	// ---------------------------------
	// RENDERING CALL
	// ---------------------------------

	render() { 
		return (
			<Box margin="large" justify="center" align="center">
				{headerElements()}
				{horizontalSpacer("10px")} 
				<div> 
					<Text size="12pt" color={Colors.grey1}> Not sure how it works? You can find a guide </Text> 
					<Text size="12pt" color={Colors.primary}> here </Text>
				</div> 
				{horizontalSpacer("20px")}
				{this.imagePreview()}
				{horizontalSpacer("20px")}
				<Box direction="row" justify="start" width="23.5%">
					{this.uploadButton()}
					<Box width="10%" />
					{this.submitButton()}
				</Box>
				{this.errhandler()}
			</Box>
		)
	}

}

// ---------------------------------// ---------------------------------// ---------------------------------
// ---------------------------------// ---------------------------------// ---------------------------------

class ImagePreview extends React.Component { 

	constructor(props) {
		super(props); 
		this.state = {}; 
		this.state = this.props.inherit;
	}

	onOpen = () => this.setState({ open: true });

	onClose = () => this.setState({ open: undefined });

	updateState = (newState) => { 
		this.props.modifyState(newState);
	}

	updateImage = (img) => { 
		// STATE SETTER HERE
		// TODO:
	}

	renderModal = () => { 
		return(
			<Layer position="center" modal onClickOutside={this.onClose} onEsc={this.onClose}>
				<Box direction="column" pad="medium" gap="medium">
					<Box direction="row" justify="between">
						<Text size="24pt" color={Colors.dark3}> Crop Image</Text>
						<Button icon={<Icons.Close color={Colors.dark3} />} onClick={this.onClose}/>
					</Box>
				</Box>
			</Layer>
		);
	}

	render() { 
		const { open } = this.state;
		return( 
			<div>
				<Button
					icon=
					{<Image src={this.state.imgurl} 
					fit="cover" 
					height="310px" 
					width="310px" 
					alt="preview" />}
					onClick={this.onOpen}
				/>
				{open && this.renderModal()}
			</div> 
		)
	}
}

class PreviewLoader extends React.Component {
	state = { value: 20 };
  
	componentDidMount() {
	  this.timer = setInterval(() => {
		const { value } = this.state;
		this.setState({ value: value < 100 ? value + 8 : 20 });
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
			alignSelf="start"
			height="50px"
			width="50px"
			type="circle"
			size="small"
			values={[{ value, color: value > 50 ? `${Colors.grey1}` : `${Colors.grey3}` }]}/>
	  );
	}
  }

class SubmitLoader extends React.Component {
	state = { value: 20 };
  
	componentDidMount() {
	  this.timer = setInterval(() => {
		const { value } = this.state;
		this.setState({ value: value < 100 ? value + 8 : 20 });
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
			alignSelf="start"
			height="25px"
			width="25px"
			type="circle"
			size="small"
			values={[{ value, color: value > 50 ? `${Colors.grey1}` : `${Colors.grey3}` }]}/>
	  );
	}
  }

const headerElements = () => {
	return (
		<Box justify="between" width="100%" direction="row">
			<Box width="33%" justify="center" align="start" pad={{ left: "large" }}>
				<Link to='/home'>
					{<Icons.LinkPrevious color={Colors.dark3} size="large" justify="left" align="left" />}
				</Link>
			</Box>
			<Box width="33%" justify="center" align="center">
				{Style.Title("Upload an image")}
			</Box>
			<Box width="33%">
			</Box>
		</Box>
	);
}

const horizontalSpacer = (amt) => { 
	return( 
		<Box width="100%" height={amt}> 
		</Box> 
	); 
} 

export default withRouter(UploadPage); 
