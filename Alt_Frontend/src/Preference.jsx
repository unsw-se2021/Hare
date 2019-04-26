import React from "react";
import { Grommet, Box } from "grommet";
import { Preference_ingredients } from "./Preference_Ingredients";
import { Preference_categories } from "./Preference_categories";

class Preference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      categories: []
    };
  }

  loadPreferences() {
    fetch("http://localhost:8081/preference/" + this.props.uid)
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log(json);
        const ingredients = [];
        for (let i = 0; i < json.preference.special.length; i++) {
          ingredients.push(json.preference.special[i].ingredient);
        }

        const categories = [];
        for (let i = 0; i < json.preference.categories.length; i++) {
          categories.push(json.preference.categories[i].category);
        }

        this.setState({
          ingredients: ingredients,
          categories: categories
        });

        console.log(this.state);
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.loadPreferences();
  }

  render() {
    return (
      <Box
        direction="column"
        border={{ color: "brand", size: "large" }}
        pad="medium"
      >
        <Preference_ingredients
          addIngredient={i =>
            this.setState({ ingredients: this.state.ingredients.concat([i]) })
          }
          removeIngredient={i =>
            this.setState({
              ingredients: this.state.ingredients.filter(x => x !== i)
            })
          }
          selectedIngredients={this.state.ingredients}
        />
        <Preference_categories
          addCategory={c =>
            this.setState({ categories: this.state.categories.concat([c]) })
          }
          removeCategory={c =>
            this.setState({
              categories: this.state.categories.filter(x => x !== c)
            })
          }
          selectedCategories={this.state.categories}
        />
      </Box>
    );
  }
}

export default Preference;
