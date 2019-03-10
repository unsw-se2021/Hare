import React, { Component } from 'react'; 
import { Grommet, grommet, Box, Paragraph, Text } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';


class Help extends Component { 
	
	render() { 
		return(
			<div>
        <Box
          direction="row"
          border={{ color: "brand", size: "small" }}
          margin="small"
        >
          <Box pad="medium" background="dark-3">
            <Icons.CircleQuestion />
          </Box>
          <Box pad="small" >
            <p>Why login?</p>
            <Text margin="small">
              Login to have a personal profile to use smart comparison and
              ingredients highlightings!
            </Text>
            <Text margin="small">
              You could login with your google or facebook account, if you dont
              have either click register button to create a new account!
            </Text>
          </Box>
        </Box>

        <Box
          direction="row"
          border={{ color: "brand", size: "small" }}
          margin="small"
        >
          <Box pad="medium" background="dark-3">
            <Icons.CircleQuestion />
          </Box>
          <Box pad="small">
            <p>How to use compare multiple products?</p>
            <Text margin="small">
              Login as our client, choose from history files to make comparison!
            </Text>
          </Box>
        </Box>

        <Box
          direction="row"
          border={{ color: "brand", size: "small" }}
          margin="small"
        >
          <Box pad="medium" background="dark-3">
            <Icons.CircleQuestion />
          </Box>
          <Box pad="small">
            <p>How to add ingredients to highlight? </p>
			<Text margin="small">
              Create a pre-set to highlight chosen ingredients or ingredient categories in your preference page
            </Text>
          </Box>
        </Box>
      </div>
		);	
	}
} 

export default Help; 
