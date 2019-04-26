import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Box } from "grommet";
import Home from "./Home";
import Help from "./Help";
import Navbar from "./Navbar";
import About from "./About";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Preference from "./Preference";
import Product from "./Product";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: ""
    };
  }

  render() {
    return (
      <Router>
        <Box
          style={{
            width: "100%",
            minHeight: "100%"
          }}
        >
          <Navbar uid={this.state.uid} />
          <Box
            pad="small"
            style={{
              maxWidth: "100%",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            <Route
              path="/home/"
              exact
              render={props => <Home {...props} userid={this.state.uid} />}
            />
            <Route path="/help/" component={Help} />
            <Route path="/about/" component={About} />
            <Route
              path="/login/"
              render={props => (
                <Login
                  {...props}
                  setuid={uid => {
                    this.setState({ uid: uid });
                  }}
                />
              )}
            />
            <Route
              path="/signup/"
              render={props => (
                <Signup
                  {...props}
                  setuid={uid => {
                    this.setState({ uid: uid });
                  }}
                />
              )}
            />
            <Route path="/profile/" component={Profile} />
            <Route
              path="/preference/"
              render={props => <Preference {...props} uid={this.state.uid} />}
            />
            <Route path="/product/" component={Product} />
          </Box>
        </Box>
      </Router>
    );
  }
}
