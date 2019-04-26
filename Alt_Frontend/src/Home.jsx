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
import CanvasTool from "./CanvasTool";

const requestFile = () => {
  document.querySelector("#upload").click();
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  processFile(file) {
    const reader = new FileReader();
    const me = this;

    reader.onload = e => {
      me.setState({ image: e.target.result });
    };

    reader.readAsDataURL(file);
  }

  drawImage() {
    if (this.state.image) {
      return (
        <CanvasTool userid={this.props.userid} imageData={this.state.image} />
      );
    } else {
      return <br />;
    }
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
            <Icons.CloudUpload alignSelf="center" size="xlarge" />
            <Button label="Upload Image" onClick={requestFile} />
            <input
              type="file"
              hidden
              id="upload"
              onChange={e => this.processFile(e.target.files[0])}
            />
          </Box>
          {this.drawImage()}
          <br />
          <br />
        </Box>
      </div>
    );
  }
}

export default Home;
