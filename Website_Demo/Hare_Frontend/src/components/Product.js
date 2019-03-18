import React, { Component } from 'react'; 
import { Grommet, grommet, DropButton,Button, Box, Heading, Menu, Paragraph, Carousel, Accordion, AccordionPanel, Text, Image, Distribution} from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Ingredient = "Ascorbic acid"
const Description = "Vitamin C, also known as ascorbic acid and L-ascorbic acid, is a vitamin found in various foods and sold as a dietary supplement."
const Uses = "It is used to prevent and treat scurvy."

const DropHighlightContent = ({ onClose }) => (
	<div>
		<Box direction="column">
			<Button icon={<Icons.Close />} onClick={onClose} />
			<Box direction="column">
				<h4 backgroun='light-1'>Descriptions:</h4>
			
				<Box>{Description}</Box>
				<Box>{Uses}</Box>
			</Box>
		</Box>
	</div>
);

DropHighlightContent.propTypes = {
	onClose: PropTypes.func.isRequired
};


class HighlightDropButton extends Component {
	state = {};

	onClose = () => {
		this.setState({ open: false });
		setTimeout(() => this.setState({ open: undefined }), 1);
	};

	render() {
		const { open } = this.state;
		return (
			<Box background='light-2'>
				<DropButton
					label={Ingredient}
					open={open}
					onClose={() => this.setState({ open: undefined })}
					dropContent={<DropHighlightContent onClose={this.onClose}/>}
				>Customize Preferences</DropButton>
			</Box>
		);
	}
}


class Product extends Component { 

	render() { 
		return(
			<div>
				<Box>
					<Box>
						<Link to="/upload">back</Link>
					</Box>
				</Box>
				<Box direction="row" justify="between" align="center" alignContent="center">
					<Heading>Result</Heading>
				</Box>
				<Box direction="row" margin='medium'>
					<Box width="small">
						<Carousel width="small">
							<Box width="small" height="small" background="light-3">
								<Text>Product photo 1</Text>
							</Box>
							<Box width="small" height="small" background="light-3">
								<Text>Product photo 2</Text>
							</Box>
							<Box width="small" height="small" background="light-3">
								<Text>Product photo 3</Text>
							</Box>
						</Carousel>
					</Box>
					<Box width='60%' gap="small" direction="row" justify="center" align="center" alignContent="center">
						<Box margin="medium" gap="medium" round="small" background="light-3" pad="small">
							<Distribution
								values={[
									{ value: 50, color: 'light-6' ,text:'Preservatives'},
									{ value: 30, color: 'brand',text:'Humectants' },
									{ value: 20, color: 'accent-1',text:'Gases' },
									{ value: 10, color: 'light-6',text:'Nutrients' },
									{ value: 5, color: 'brand' },
								]}
							>
								{value => (
									<Box pad="small" background={value.color} fill>
										<Text alignSelf='center'
											size="small">{value.text}</Text>
									</Box>
								)}
							</Distribution>
						</Box>
					</Box>
				</Box>
				<Accordion width="100%">
					<AccordionPanel label="Nutrients">
						<Box background="light-2">Thiamine hydrochloride</Box>
						<Box background="light-2">niacinamide</Box>
						<Box background="light-2">folic acid</Box>						
					</AccordionPanel>
					<AccordionPanel label="Humectants">
						<Box background="light-2">Glycerin</Box>
						<Box background="light-2">sorbitol</Box>
					</AccordionPanel>
					<AccordionPanel label="Preservatives">
						<HighlightDropButton />
						<Box background="light-2">potassium sorbate</Box>
						<Box background="light-2">sodium benzoate</Box>
					</AccordionPanel>
				</Accordion>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
		);	
	}
} 

export default Product; 
