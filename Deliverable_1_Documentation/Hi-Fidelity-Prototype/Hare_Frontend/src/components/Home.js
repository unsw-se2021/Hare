import React, { Component } from "react";
import {
  Grommet,
  grommet,
  Box,
  Heading,
  Menu,
  Paragraph,
  Image,
  Text
} from "grommet";
import * as Icons from "grommet-icons";
import { Route, Link, Router, BrowserRouter } from "react-router-dom";
import camera from "../camera11.png";
import setting from "../setting11.png";
import upload from "../upload11.png";
import lense from "../lense11.png";
class Home extends Component {
  render() {
    return (
      <div>
        <h1>Homepage</h1>
        <br />
        <Box alignSelf="center" pad="medium">
          <Icons.CloudUpload alignSelf="center" size="large" />
          <Link to="/upload">Upload Image</Link>
        </Box>

        <Box
          direction="row"
          border={{ color: "brand", size: "small" }}
          pad="small"
          margin="small"
          height="small"
        >
          <Box pad="small" width="small" hight="small">
            <Image fit="contain" src={camera} />
          </Box>
          <Box pad="small">
            <heading level="1">Adaptive OCR</heading>
            <Text>
              Our OCR technology(powered by Google and Auto ML) adaptes to many
              different lighting conditions
            </Text>
          </Box>
        </Box>

        <Box
          direction="row"
          border={{ color: "brand", size: "small" }}
          pad="small"
          margin="small"
          height="small"
        >
          <Box pad="small" width="small" hight="small">
            <Image fit="contain" src={upload} />
          </Box>
          <Box pad="small">
            <heading level="1">Ingredients Assessment</heading>
            <Text>
              We use highly reputable data sources(such as FDA) to assess the
              safety of ingredients
            </Text>
          </Box>
        </Box>

        <Box
          direction="row"
          border={{ color: "brand", size: "small" }}
          pad="small"
          margin="small"
          height="small"
        >
          <Box pad="small" width="small" hight="small">
            <Image fit="contain" src={setting} />
          </Box>
          <Box pad="small">
            <heading level="1">Personalisation</heading>
            <Text>
              You could set up a profile with your own requirements and
              preferences(e.g allergies) for personal assessments
            </Text>
          </Box>
        </Box>

        <Box
          direction="row"
          border={{ color: "brand", size: "small" }}
          pad="small"
          margin="small"
          height="small"
        >
          <Box pad="small" width="small" hight="small">
            <Image fit="contain" src={lense} />
          </Box>
          <Box pad="small">
            <heading level="1">Smart Comparison</heading>
            <Text>
              You could save all the products you scan and the use our algorithm
              to intelligently do comparison
            </Text>
          </Box>
        </Box>
      </div>
    );
  }
}

export default Home;
