import React, { Component } from 'react';
import {Grommet, grommet, Box, Paragraph, Text, Accordion, AccordionPanel, Heading,Button} from 'grommet';

import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';


class compareResult extends Component {
        render() {
                 return(
                         <div>
			 <Box>
			  <Button href="/upload" alignSelf="center" label="submit"/>
			 </Box>


			   </div>
                                );
        }
}

export default compareResult;

