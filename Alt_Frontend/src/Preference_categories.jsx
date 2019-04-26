import React from "react";
import { Grommet, Box } from "grommet";
import { PrefCategories } from "./pref_categories";
import { SelectedCategories } from "./SelectedCategories";
import categories from "./categories.json";

export class Preference_categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCategory: "",
      categories: []
    };
  }

  componentDidMount() {
    this.getALlCategories();
  }

  getALlCategories() {
    this.setState({ categories: categories });
  }

  render() {
    return (
      <Box
        direction="row"
        border={{ color: "brand", size: "small" }}
        pad="medium"
      >
        <PrefCategories
          categories={this.state.categories}
          AddPrefCategory={this.props.addCategory}
        />
        <SelectedCategories
          selectedCategories={this.props.selectedCategories}
          removeCategory={this.props.removeCategory}
        />
      </Box>
    );
  }
}

export default Preference_categories;
