import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { Box, Button } from "grommet";

const createCanvas = (width, height, id, zindex) => {
  let canv = document.createElement("canvas");
  canv.style.position = "absolute";
  canv.style.top = 0;
  canv.style.left = 0;
  canv.style.zIndex = zindex;
  canv.id = id;
  canv.width = width;
  canv.height = height;
  canv.style.width = "100%";

  return canv;
};

const validateCorners = selection => {
  const x1 = selection[0][0];
  const x2 = selection[1][0];
  const y1 = selection[0][1];
  const y2 = selection[1][1];
  let xMax = x1 > x2 ? x1 : x2;
  let xMin = x1 + x2 - xMax;
  let yMax = y1 > y2 ? y1 : y2;
  let yMin = y1 + y2 - yMax;
  return [xMin, yMin, xMax, yMax];
};

const drawSelection = (selection, canvasContext) => {
  if (selection.length == 0) return;

  canvasContext.clearRect(
    0,
    0,
    canvasContext.canvas.width,
    canvasContext.canvas.height
  );

  let lastVex = selection.length == 2 ? 1 : 0;
  canvasContext.fillStyle = "green";
  canvasContext.fillRect(
    selection[lastVex][0] - 4,
    selection[lastVex][1] - 4,
    8,
    8
  );

  if (selection.length < 2) return;

  const coords = validateCorners(selection);
  const xMin = coords[0];
  const yMin = coords[1];
  const xMax = coords[2];
  const yMax = coords[3];
  const width = xMax - xMin;
  const height = yMax - yMin;
  canvasContext.beginPath();
  canvasContext.lineWidth = "2";
  canvasContext.strokeStyle = "green";
  canvasContext.rect(xMin, yMin, width, height);
  canvasContext.stroke();
};

class CanvasTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: [],
      imageElement: null
    };

    const img = new Image();
    img.src = props.imageData;
    img.onload = () => {
      this.setState({
        imageElement: img
      });
    };
  }

  submitImage() {
    const me = this;
    return () => {
      let content64 = "";
      if (me.state.selection.length == 2) {
        //crop image
        const corners = validateCorners(me.state.selection);
        const secret = createCanvas(
          corners[2] - corners[0],
          corners[3] - corners[1],
          "canvas-secret",
          0
        );
        secret
          .getContext("2d")
          .drawImage(
            document.getElementById("canvas-bg"),
            corners[0],
            corners[1],
            secret.width,
            secret.height,
            0,
            0,
            secret.width,
            secret.height
          );

        //convert region to base64
        content64 = secret.toDataURL().replace("data:image/png;base64,", "");
      } else {
        content64 = document
          .getElementById("canvas-bg")
          .toDataURL()
          .replace("data:image/png;base64,", "");
      }
      fetch("http://localhost:8081/gen_product_guest/julie", {
        method: "POST",
        body: JSON.stringify({
          image: content64
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          return res.text();
        })
        .then(pid => {
          this.props.history.push("/product/" + pid);
        })
        .catch(console.log);
    };
  }

  updateSelection() {
    const me = this;
    return event => {
      let x = new Number();
      let y = new Number();
      let canvas = event.target;

      if (event.x != undefined && event.y != undefined) {
        x = event.x;
        y = event.y;
      } // Firefox method to get the position
      else {
        x =
          event.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        y =
          event.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }
      let rect = canvas.getBoundingClientRect();
      x -= rect.left;
      y -= rect.top;

      let scaleX = canvas.width / rect.width;
      let scaleY = canvas.height / rect.height;

      x *= scaleX;
      y *= scaleY;

      let selection = [];
      if (me.state.selection.length == 1) {
        selection.push(me.state.selection[0]);
      } else if (me.state.selection.length == 2) {
        selection.push(me.state.selection[1]);
      }
      selection.push([x, y]);
      me.setState({ selection: selection });
      me.forceUpdate();
    };
  }

  drawTool() {
    let img = this.state.imageElement;
    let canv_bg = createCanvas(img.width, img.height, "canvas-bg", 0);
    canv_bg.getContext("2d").drawImage(img, 0, 0);

    let canv_select = createCanvas(img.width, img.height, "canvas-select", 1);
    canv_select.onclick = this.updateSelection();
    drawSelection(this.state.selection, canv_select.getContext("2d"));

    return (
      <div
        style={{ position: "relative", height: canv_bg.height + "px" }}
        ref={ref => {
          if (ref === null) return;
          while (ref.firstChild) ref.removeChild(ref.firstChild);
          ref.appendChild(canv_bg);
          ref.appendChild(canv_select);
        }}
      />
    );
  }

  render() {
    if (this.state.imageElement) {
      return (
        <React.Fragment>
          <Box width="large">{this.drawTool()}</Box>
          <Box width="large">
            <Button label="Submit" onClick={this.submitImage()} />
          </Box>
        </React.Fragment>
      );
    } else {
      return <br />;
    }
  }
}

export default withRouter(CanvasTool);
