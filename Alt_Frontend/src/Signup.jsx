import React, { Component } from "react";
import {
  Grommet,
  grommet,
  Button,
  Box,
  Heading,
  Menu,
  TextInput,
  Paragraph
} from "grommet";
import * as Icons from "grommet-icons";

class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      reveal: false
    };
  }

  render() {
    return (
      <Box
        round="small"
        margin="medium"
        width="medium"
        align="center"
        direction="row"
        border
      >
        <TextInput
          plain
          style={{ maxWidth: "100%" }}
          placeholder="Enter Password"
          type={this.state.reveal ? "text" : "password"}
          value={this.state.inputValue}
          onChange={event => {
            this.setState({
              inputValue: event.target.value
            });
            this.props.onChange(event);
          }}
        />
        <Button
          icon={
            this.state.reveal ? (
              <Icons.FormLock size="medium" />
            ) : (
              <Icons.View size="medium" />
            )
          }
          onClick={() => this.setState({ reveal: !this.state.reveal })}
        />
      </Box>
    );
  }
}

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      useremail: "",
      password: ""
    };
  }

  AddNewUser(username, useremail, password) {
    fetch("http://localhost:8081/register", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        usereamil: useremail,
        userpws: password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.text();
      })
      .then(auth => {
        this.props.setuid(auth);
        this.props.history.push("/home");
      })
      .catch(console.log);
  }

  render() {
    return (
      <div>
        <Box align="center" alignSelf="center" direction="column">
          <Box
            alignContents="stretch"
            width="medium"
            margin="medium"
            align="center"
            round="small"
          >
            <Box round="small" direction="row" margin="medium" width="medium">
              <TextInput
                placeholder="Enter name"
                style={{ maxWidth: "100%" }}
                onChange={e => {
                  this.state.username = e.target.value;
                }}
              />
            </Box>

            <Box round="small" direction="row" margin="medium" width="medium">
              <TextInput
                placeholder="Enter Email"
                style={{ maxWidth: "100%" }}
                onChange={e => {
                  this.state.useremail = e.target.value;
                }}
              />
            </Box>

            <PasswordInput
              onChange={e => {
                this.state.password = e.target.value;
              }}
            />
            <Button
              onClick={() => {
                console.log(this.state);
                this.AddNewUser(
                  this.state.username,
                  this.state.useremail,
                  this.state.password
                );
              }}
              label="Signup"
            />
          </Box>
        </Box>
      </div>
    );
  }
}

export default Signup;
