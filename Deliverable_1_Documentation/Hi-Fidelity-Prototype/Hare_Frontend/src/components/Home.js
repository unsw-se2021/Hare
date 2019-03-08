import React, { Component } from "react";
import {
  Grommet,
  grommet,
  Box,
  Heading,
  Menu,
  Paragraph,
  Image,
  Text } from "grommet";
import * as Icons from "grommet-icons";
import { Route, Link, Router, BrowserRouter } from "react-router-dom";

const bulletFeatures = (title, icon, text) => {
	return	(<Box width="25%">
				<Box direction="row" gap="small" height="xsmall" align="center" alignContent="center">
					{icon}{title}
				</Box>
				<Box>
					{text}
				</Box>
			</Box>);
}

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Homepage</h1>
        <br />
		<Box alignSelf="center" pad="medium" direction="row" justify="center" round="small" background="light-3">
			<Box>
				<Icons.CloudUpload alignSelf="center" size="xlarge" />
				<Link to="/upload">Upload Image</Link>
			</Box>
        </Box>
        <br />
        <br />
		<Box direction="row" gap="medium">
			{bulletFeatures(<Heading level="4">Adaptive OCR</Heading>, <Icons.Camera/>, <Text> 
				Our OCR technology(powered by Google and Auto ML) adaptes to many
				different lighting conditions
			</Text>)}

			{bulletFeatures(<Heading level="4">Ingredients Assessment</Heading>, <Icons.DocumentText/>, <Text>
				We use highly reputable data sources (such as FDA) to assess the
				safety of ingredients.
			</Text>)}

			{bulletFeatures(<Heading level="4">Personalisation</Heading>, <Icons.System/>, <Text>
				You could set up a profile with your own requirements and
				preferences (e.g. allergies) for personal assessments.
			</Text>)}

			{bulletFeatures(<Heading level="4">Smart Comparison</Heading>, <Icons.SearchAdvanced/>, <Text>
				You could save all the products you scan and the use our algorithm
				to intelligently do comparison.
			</Text>)}
		</Box>
      </div>
    );
  }
}

export default Home;
