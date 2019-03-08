import React, { Component } from "react";
import {
  Grommet,
  grommet,
  Box,
  Heading,
  Menu,
  Paragraph,
  Image
} from "grommet";
import * as Icons from "grommet-icons";
import { Route, Link, Router, BrowserRouter } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Homepage</h1>
        <br />
        <Box
          alignSelf="center"
          border={{ color: "dark-3", size: "large" }}
          pad="medium"
        >
          <Icons.StatusInfo alignSelf="center" size="large" />
          <br />
          <Paragraph margin="small">
            This page is currently under construction If you are here to test
            the "Upload" feature, follow this link:
          </Paragraph>
          <br />
          <Link to="/upload">Upload Image</Link>
        </Box>

        <Box
          direction="row"
          border={{ color: "brand", size: "small" }}
          pad="small"
        >
          <Box pad="small" background="dark-3">
            <Image fit="cover" src="camera11.png" />
          </Box>
          <Box pad="medium" background="light-3">
            <heading level="1">Ingredients Assessment</heading>
            <heading level="3">
              We use highly reputable data sources(such as FDA) to assess the
              safety of ingredients
            </heading>
          </Box>
        </Box>
      </div>
    );
  }
}

export default Home;
