import React, { Component } from 'react';
import { MaskedInput, Text, DropButton, Button, Grommet, grommet, Box, Heading, Menu, TextInput, Paragraph } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';



class personalSetting extends Component {

        render() {
                return(
                        <div>
				  <h2>Account Settings</h2>
                                <br />
                                <TextInput placeholder="Name" />
                                <TextInput placeholder="Email" />
                                <Link to='/user'>
                                        <Box pad="small" background="dark-3" >Update</Box>
                                        <br />
                                </Link>
                                <Box pad="small" background="dark-3">Change Password</Box>
                                <br />
                                <hr />


                        </div>
                );
                }
}

export default personalSetting;











