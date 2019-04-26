import React from "react";
export class PrefIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearchText: "Defaul_String_So_No_Current_Match"
    };
  }

  displayIngredients() {
    console.log(this.props);
    return (
      <ul>
        {this.props.ingredients
          .filter(ingredient =>
            ingredient
              .toLowerCase()
              .includes(this.state.currentSearchText.toLowerCase())
          )
          .slice(0, 10)
          .map(ingredient => (
            <li onClick={() => this.props.AddPrefIngredient(ingredient)}>
              {ingredient}
            </li>
          ))}
      </ul>
    );
  }

  onSearchChange = event => {
    this.setState({
      currentSearchText:
        event.target.value.length === 0
          ? "Defaul_String_So_No_Current_Match"
          : event.target.value
    });
  };

  render() {
    return (
      <div className="PrefIngredients">
        <h3>Ingredients Search</h3>
        <input type="text" name="search" onChange={this.onSearchChange} />
        {this.displayIngredients()}
      </div>
    );
  }
}
export default PrefIngredients;
