import React from "react";
import { Heading, Box, Carousel, Text, Button } from "grommet";

export class SelectedIngredients extends React.Component {
  constructor(props) {
    super(props);
  }

  displayHistory = () => {
    return this.props.selectedIngredients.map(ingredient => (
      <li>
        {ingredient}
        <Button onClick={() => this.props.removeIngredient(ingredient)} />
      </li>
    ));
  };

  render() {
    return <ul>{this.displayHistory()}</ul>;
  }
}

export default SelectedIngredients;
