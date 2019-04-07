mport React from 'react';
import { Box, Grid, Image, Heading, Paragraph, ResponsiveContext, Text, Button } from 'grommet';
import SandboxComponent from './SandboxComponent';

export default () => (
  <SandboxComponent style={{"padding" : "0px"}}>
    <Box fill="true" style={{"position" : "relative", "padding" : "0px"}} background="brand">
    <Box file="horizontal" height="60px" style={{"background-color" : "#C0CCDB", "position" : "fixed", "z-index" : "1000", "width" : "100%", "top": "0px"}}>
      <Grid
      rows={['xsmall']}
      columns={['1/3', '1/3', '1/3']}
      gap="false"
      areas={[
        { name: 'header', start: [0, 0], end: [0, 0] },
        { name: 'nav', start: [1, 0], end: [1, 0] },
        { name: 'main', start: [2, 0], end: [2, 0] },
      ]}
    >
      <Box gridArea="header" background="false">
        <Grid
          rows={['xxsmall']}
          columns={['1/3', '1/3', '1/3']}
          gap="false"
          areas={[
            { name: 'left-left', start: [0, 0], end: [0, 0] },
            { name: 'left-center', start: [1, 0], end: [1, 0] },
            { name: 'left-right', start: [2, 0], end: [2, 0] },
          ]}
        >
        <Box gridArea="left-left" background="false" align="center">
          <Paragraph style={{"margin-top" : "calc(1vw - 5px)", "text-align" : "center"}}>About</Paragraph>
        </Box>
        <Box gridArea="left-center" background="false" align="center">
          <Paragraph style={{"margin-top" : "calc(1vw - 5px)", "text-align" : "center"}}>Team</Paragraph>
        </Box>
        <Box gridArea="left-right" background="false" align="center">
          <Paragraph style={{"margin-top" : "calc(1vw - 5px)", "text-align" : "center"}}>Source Code</Paragraph>
        </Box>
        </Grid>
      </Box>
      <Box gridArea="nav" background="false" align="center">
        <Heading level="2" style={{"margin-top" : "7.5px"}}>Hare</Heading>
      </Box>
      <Box gridArea="main" background="false" align="right">
        <Paragraph style={{"margin-top" : "calc(1vw - 5px)", "top" : "0px", "right" : "15px", "position": "absolute"}}>User</Paragraph>
      </Box>
    </Grid>
    </Box>
    <Image
      alignSelf="stretch"
      fit="cover"
      src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"
      style={{"z-index" : "1", "width" : "100%", "height" : "auto"}}
      />
      <Box align="center" alignSelf="center"
          style={{"position":"absolute", "z-index" : "100", "top": "calc(50% - 30px - 60px)"}}
      >
      <Heading margin="none" level="2"
          color="light-1"
      >Information about product ingredients</Heading>
      <Button label="Scan Something"
          onClick={() => {}}
          style={{"border-radius" : "2px", "margin-top" : "15px", "background-color" : "#0852ED", "border" : "1px solid white", "color" : "white"}}
        />
      </Box>
      </Box>
  </SandboxComponent>
);
