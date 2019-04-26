import React, { Component } from "react";
import {
  Grommet,
  grommet,
  Box,
  Button,
  Heading,
  Menu,
  Image,
  Text
} from "grommet";
import * as Icons from "grommet-icons";
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

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
            <Link to="/preference" style={{ textDecoration: "none" }}>
              <Box>
                <Icons.Configure alignSelf="center" size="xlarge" />
                <h2>Preference setting</h2>
              </Box>
            </Link>

            <Link to="/history_products" style={{ textDecoration: "none" }}>
              <Box>
                <Icons.Folder alignSelf="center" size="xlarge" />
                <h2>History products</h2>
              </Box>
            </Link>
          </Box>
          <br />
          <br />
        </Box>
      </div>
    );
  }
}

export default Profile;
