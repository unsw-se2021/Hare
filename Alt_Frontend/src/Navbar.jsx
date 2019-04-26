import React, { Component } from "react";
import { Grommet, grommet, Box, Button, Heading, Menu, Image } from "grommet";
import * as Icons from "grommet-icons";
import { Redirect, Route, Link, Router, withRouter } from "react-router-dom";
import logo from "./logo.png";
class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null
    };

    if (props.id !== "") {
      fetch("http://localhost:8081/api/profile_user_info/" + props.uid)
        .then(res => {
          return res.json();
        })
        .then(profile => {
          this.setState({
            username: profile.username
          });
        })
        .catch(console.log);
    }
  }
  navigateToHome = () => {
    this.props.history.push("/home");
  };

  navigateToHelp = () => {
    this.props.history.push("/help");
  };

  navigateToLogin = () => {
    this.props.history.push("/login");
  };

  navigateToProfile = () => {
    this.props.history.push("/profile");
  };

  navigateToRegister = () => {
    this.props.history.push("/signup");
  };

  menu_guest = () => {
    return [
      { label: "You aren't logged in", disabled: true },
      {
        label: "Sign up",
        onClick: () => {
          this.navigateToRegister();
        }
      },
      {
        label: "Log in",
        onClick: () => {
          this.navigateToLogin();
        }
      }
    ];
  };

  menu_client = () => {
    return [
      { label: "Welcome!", disabled: true },
      {
        label: this.state.username ? this.state.username : this.props.uid,
        onClick: () => {
          this.navigateToProfile();
        }
      }
    ];
  };

  display_item() {
    if (this.props.uid) return this.menu_client();
    return this.menu_guest();
  }

  render() {
    return (
      <Box
        tag="header" // Tag that appears in rendered HTML
        border={{ color: "brand", side: "bottom", size: "medium" }}
        align="center"
        pad="small" // Internal padding | --> contents <-- |
        elevation="medium" // Drop shadow "distance" above ground
        justify="between" // Pushes items inside of box to both sides
        direction="row" // Stretch sideways instead of upwards
        flex={false}
      >
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Box
            direction="row"
            gap="small"
            width="small"
            align="center"
            alignContent="center"
          >
            <Box height="100%" width="85%">
              <Image fit="cover" src={logo} />
            </Box>
          </Box>
        </Link>
        <Box direction="row">
          <Link to="/about" style={{ textDecoration: "none" }}>
            <Box align="center" alignContent="center">
              <Box height="100%">
                <h3>About us</h3>
              </Box>
            </Box>
          </Link>
          <Button
            icon={<Icons.CircleQuestion />}
            onClick={() => {
              this.navigateToHelp();
            }}
          />
          <Menu
            id="user_button"
            items={this.display_item()}
            icon={<Icons.ContactInfo color="black" />}
          />
        </Box>
      </Box>
    );
  }
}
export default withRouter(Navbar);
