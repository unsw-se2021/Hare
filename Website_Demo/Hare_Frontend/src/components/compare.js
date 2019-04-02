import React, { Component } from 'react';
import {Grommet, grommet, Box, Paragraph, Text, Accordion, AccordionPanel, Heading,Button} from 'grommet';

import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';


class compare extends Component {
	render() {
	         return(
			 <div>
			 <Heading margin="medium" alingSelf="center" textAlign = "center" background = "dark-3">Products to compare</Heading>

			 <Box direction = "row">
			     
                              <Box width="50%" gap="small">
                                                <Box
                                                        direction="row"
                                                        width="medium"
                                                        height="medium"
                                                        justify="center"
                                                        align="center"
                                                        alignContent="center"
                                                        round="small"
                                                        background="light-3"
                                                >
                                                        <Icons.Camera alignSelf="center" size="xlarge"/>
                                                </Box>


						 <Link full={true} to="/savedProduct">
                                                        <Box width="medium" background="light-3" round="small" pad="small">
                                                                <Button
                                                                        width="100%"
                                                                        icon={<Icons.Upload/>}
                                                                        label="Choose from history"
                                                                >
                                                                        Submit
                                                                </Button>
                                                        </Box>
                                                </Link>


			 			
			                         <Box width="medium" background="light-3" round="small" pad="small">
                                                        <Button
                                                                width="100%"
                                                                icon={<Icons.FolderOpen/>}
                                                                label="upload"
                                                        >
                                                                Browse
                                                        </Button>
                                                </Box>


                            </Box>
			  

			     <Box width="50%" gap="small">
                                                <Box
                                                        direction="row"
                                                        width="medium"
                                                        height="medium"
                                                        justify="center"
                                                        align="center"
                                                        alignContent="center"
                                                        round="small"
                                                        background="light-3"
                                                >
                                                        <Icons.Camera alignSelf="center" size="xlarge"/>
                                                </Box>



						 <Link full={true} to="/savedProduct">
                                                        <Box width="medium" background="light-3" round="small" pad="small">
                                                                <Button
                                                                        width="100%"
                                                                        icon={<Icons.Upload/>}
                                                                        label="Choose from history"
                                                                >
                                                                        Submit
                                                                </Button>
                                                        </Box>
                                                </Link>

	

                                                 <Box width="medium" background="light-3" round="small" pad="small">
                                                        <Button
                                                                width="100%"
                                                                icon={<Icons.FolderOpen/>}
                                                                label="upload"
                                                        >
                                                                Browse
                                                        </Button>
                                                </Box>

			
                        	    </Box>



			 </Box>


			 <Box direction = "column"> 
			<Button href="/compareResult" alignSelf="center" label="submit"/>

			 </Box>



			 </div>
			 	);
	}
}

export default compare;

