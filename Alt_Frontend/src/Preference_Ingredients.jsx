import React from "react";
import { Grommet, Box } from "grommet";
import { PrefIngredients } from "./pref_ingredients";
import { SelectedIngredients } from "./SelectedIngredients";
import ingredients from "./ingredients.json";

export class Preference_ingredients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIngredients: "",
      ingredients: []
    };
  }

  componentDidMount() {
    this.getALlIngredients();
  }

  getALlIngredients() {
    this.setState({ ingredients: ingredients });
  }

  render() {
    return (
      <Box
        direction="row"
        border={{ color: "brand", size: "small" }}
        pad="medium"
      >
        <PrefIngredients
          ingredients={this.state.ingredients}
          AddPrefIngredient={this.props.addIngredient}
        />
        <SelectedIngredients
          selectedIngredients={this.props.selectedIngredients}
          removeIngredient={this.props.removeIngredient}
        />
      </Box>
    );
  }
}

export default Preference_ingredients;
