import React, { Component } from "react";
import {
  Grommet,
  grommet,
  Box,
  Button,
  Heading,
  Menu,
  Paragraph,
  Image,
  Text
} from "grommet";
import * as Icons from "grommet-icons";

const bulletFeatures = (title, icon, text) => {
  return (
    <Box
      height="25%"
      border={{
        color: "brand",
        size: "small",
        side: "all"
      }}
      pad="small"
    >
      <Box
        direction="row"
        gap="small"
        height="xsmall"
        align="center"
        alignContent="center"
      >
        {icon}
        {title}
      </Box>
      <Box>{text}</Box>
    </Box>
  );
};

class About extends Component {
  render() {
    return (
      <div>
        <Box responsive>
          <br />
          <Box
            alignSelf="center"
            align="center"
            alignConent="center"
            pad="medium"
            justify="center"
            round="small"
          >
            <Box gap="medium">
              {bulletFeatures(
                <Heading level="4">Adaptive OCR</Heading>,
                <Icons.Camera />,
                <Text>
                  Our OCR technology(powered by Google and Auto ML) adaptes to
                  many different lighting conditions
                </Text>
              )}

              {bulletFeatures(
                <Heading level="4">Ingredients Assessment</Heading>,
                <Icons.DocumentText />,
                <Text>
                  We use highly reputable data sources (such as FDA) to assess
                  the safety of ingredients.
                </Text>
              )}

              {bulletFeatures(
                <Heading level="4">Personalisation</Heading>,
                <Icons.System />,
                <Text>
                  You could set up a profile with your own requirements and
                  preferences (e.g. allergies) for personal assessments.
                </Text>
              )}

              {bulletFeatures(
                <Heading level="4">Smart Comparison</Heading>,
                <Icons.SearchAdvanced />,
                <Text>
                  You could save all the products you scan and the use our
                  algorithm to intelligently do comparison.
                </Text>
              )}
            </Box>
          </Box>
          <br />
          <br />
        </Box>
      </div>
    );
  }
}

export default About;
