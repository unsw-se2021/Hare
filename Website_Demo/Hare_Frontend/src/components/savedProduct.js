import React, { Component } from 'react';
import { MaskedInput, Text, DropButton, Button, Grommet, grommet, Box, Heading, Menu, TextInput, Paragraph } from 'grommet';
import * as Icons from 'grommet-icons';
import { Route, Link, Router, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';



class savedProduct extends Component {

        render() {
                return(
                        <div>
                                <h2>Saved Products</h2>
                                <br />

                                        <Link to='/userproduct'>
                                                Product A, Product B, Product C
                                        </Link>
                        <hr />
  </div>
                );
                }
}

export default savedProduct;




