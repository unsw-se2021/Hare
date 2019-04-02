

import React, { Component } from 'react';
import { Grommet, grommet, DropButton,Button, Layer, Box, Heading, Menu, Paragraph, Carousel, Accordion, AccordionPanel, Text, Image, Distribution} from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const DropHighlightContent = ({ onClose, name, description, uses }) => (
        <Layer>
                <Box direction="column" pad="small">
                        <Button icon={<Icons.Close />} onClick={onClose} />
                        <Box direction="column">
                                <h3 background='light-1'>{name}</h3>
                                <h4 background='light-1'>Descriptions:</h4>

                                <Box>{description}</Box>
                                <Box>{uses}</Box>
                        </Box>
                </Box>
        </Layer>
);

DropHighlightContent.propTypes = { onClose: PropTypes.func.isRequired };
DropHighlightContent.propTypes = { description: PropTypes.func.isRequired };
DropHighlightContent.propTypes = { uses: PropTypes.func.isRequired };

class HighlightDropButton extends Component {
        state = {};

        onClose = () => {
                this.setState({ open: false });
                setTimeout(() => this.setState({ open: undefined }), 1);
        };

        name = this.props.ingredient;
        description = this.props.description;
        uses = this.props.uses;

        render() {
                const { open } = this.state;
                return (
                        <Box background='light-2'>
                                <DropButton
                                        label={this.props.ingredient}
                                        open={open}
                                        onClose={() => this.setState({ open: undefined })}
                                        dropContent={<DropHighlightContent onClose={this.onClose} name={this.name} description={this.description} uses={this.uses}/>}
                                >Customize Preferences</DropButton>
                        </Box>
                );
        }
}



class compareResult extends Component {
        render() {
                 return(
                         <div>
			 <Box direction="row">
			  
			
			  <Box  margin='medium'>
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
					 <Accordion width="100%">
                                        <AccordionPanel label="Nutrients">
                                                <HighlightDropButton ingredient="Thiamine Hydrochloride" description="Thiamine Hydrochloride is the hydrochloride salt form of thiamine, a vitamin essential for aerobic metabolism, cell growth, transmission of nerve impulses and acetylcholine synthesis." uses="Thiamine injection is used to treat beriberi, a serious condition caused by prolonged lack of vitamin B1." />
                                                <HighlightDropButton ingredient="Niacinamide" description="Niacinamide is one of the two forms of vitamin B3 — the other being nicotinic acid. Vitamin B3 is also known as niacin. Niacinamide and nicotinic acid both provide vitamin B3 activity, but they differ in chemical structure and how they affect your health." uses="As a supplement, nicotinic acid is a form of niacin used to reduce cholesterol levels and lower your risk of heart disease."/>        
                                        </AccordionPanel>
                                        <AccordionPanel label="Humectants">
                                                <HighlightDropButton ingredient="Sorbitol" description="Sorbitol is a sugar alcohol found in fruits and plants with diuretic, laxative and cathartic property. Unabsorbed sorbitol retains water in the large intestine through osmotic pressure thereby stimulating peristalsis of the intestine and exerting its diuretic, laxative and cathartic effect." uses="Sorbitol can be used as a laxative when taken orally or as an enema. Sorbitol works as a laxative by drawing water into the large intestine, stimulating bowel movements."/>
                                        </AccordionPanel>
                                        <AccordionPanel label="Preservatives">
                                                <HighlightDropButton ingredient="Ascorbic Acid" description="Vitamin C, also known as ascorbic acid and L-ascorbic acid, is a vitamin found in various foods and sold as a dietary supplement." uses="It is used to prevent and treat scurvy."/>
                                                <HighlightDropButton ingredient="Potassium sorbate" description="Potassium sorbate is a chemical additive. It's widely used as a preservative in foods, drinks, and personal care products. It is an odorless and tasteless salt synthetically produced from sorbic acid and potassium hydroxide." uses="Potassium sorbate is used to inhibit molds and yeasts in many foods, such as cheese, wine, yogurt, dried meats, apple cider, soft drinks and fruit drinks, and baked goods."/>
                                                <HighlightDropButton ingredient="Sodium benzoate" description="It is a widely used food preservative, with an E number of E211. It is the sodium salt of benzoic acid and exists in this form when dissolved in water. It can be produced by reacting sodium hydroxide with benzoic acid." uses="Sodium benzoate is a preservative, with the E number E211. It is most widely used in acidic foods such as salad dressings (i.e. acetic acid in vinegar), carbonated drinks (carbonic acid), jams and fruit juices (citric acid), pickles (acetic acid), condiments and frogurt toppings."/>
                                        </AccordionPanel>
                                </Accordion>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />




			  </Box>
			 
                          

                          <Box  margin='medium'>
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

					 <Accordion width="100%">
                                        <AccordionPanel label="Nutrients">
                                                <HighlightDropButton ingredient="Thiamine Hydrochloride" description="Thiamine Hydrochloride is the hydrochloride salt form of thiamine, a vitamin essential for aerobic metabolism, cell growth, transmission of nerve impulses and acetylcholine synthesis." uses="Thiamine injection is used to treat beriberi, a serious condition caused by prolonged lack of vitamin B1." />
                                                <HighlightDropButton ingredient="Niacinamide" description="Niacinamide is one of the two forms of vitamin B3 — the other being nicotinic acid. Vitamin B3 is also known as niacin. Niacinamide and nicotinic acid both provide vitamin B3 activity, but they differ in chemical structure and how they affect your health." uses="As a supplement, nicotinic acid is a form of niacin used to reduce cholesterol levels and lower your risk of heart disease."/>
                                        </AccordionPanel>
                                        <AccordionPanel label="Humectants">
                                                <HighlightDropButton ingredient="Sorbitol" description="Sorbitol is a sugar alcohol found in fruits and plants with diuretic, laxative and cathartic property. Unabsorbed sorbitol retains water in the large intestine through osmotic pressure thereby stimulating peristalsis of the intestine and exerting its diuretic, laxative and cathartic effect." uses="Sorbitol can be used as a laxative when taken orally or as an enema. Sorbitol works as a laxative by drawing water into the large intestine, stimulating bowel movements."/>
                                        </AccordionPanel>
                                        <AccordionPanel label="Preservatives">
                                                <HighlightDropButton ingredient="Ascorbic Acid" description="Vitamin C, also known as ascorbic acid and L-ascorbic acid, is a vitamin found in various foods and sold as a dietary supplement." uses="It is used to prevent and treat scurvy."/>
                                                <HighlightDropButton ingredient="Potassium sorbate" description="Potassium sorbate is a chemical additive. It's widely used as a preservative in foods, drinks, and personal care products. It is an odorless and tasteless salt synthetically produced from sorbic acid and potassium hydroxide." uses="Potassium sorbate is used to inhibit molds and yeasts in many foods, such as cheese, wine, yogurt, dried meats, apple cider, soft drinks and fruit drinks, and baked goods."/>
                                                <HighlightDropButton ingredient="Sodium benzoate" description="It is a widely used food preservative, with an E number of E211. It is the sodium salt of benzoic acid and exists in this form when dissolved in water. It can be produced by reacting sodium hydroxide with benzoic acid." uses="Sodium benzoate is a preservative, with the E number E211. It is most widely used in acidic foods such as salad dressings (i.e. acetic acid in vinegar), carbonated drinks (carbonic acid), jams and fruit juices (citric acid), pickles (acetic acid), condiments and frogurt toppings."/>
                                        </AccordionPanel>
                                </Accordion>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />




                                </Box>

                         </Box>

			   </div>
                                );
        }
}

export default compareResult;

