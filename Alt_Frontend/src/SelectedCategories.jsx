import React from "react";
import { Heading, Box, Carousel, Text, Button } from "grommet";

export class SelectedCategories extends React.Component {
  constructor(props) {
    super(props);
  }

  displayHistory = () => {
    return this.props.selectedCategories.map(category => (
      <li>
        {category}
        <Button onClick={() => this.props.removeCategory(category)} />
      </li>
    ));
  };

  render() {
    return <ul>{this.displayHistory()}</ul>;
  }
}

export default SelectedCategories;
