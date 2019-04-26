import React from "react";
export class PrefCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearchText: "Defaul_String_So_No_Current_Match"
    };
  }

  displayCategories() {
    console.log(this.props);
    return (
      <ul>
        {this.props.categories
          .filter(category =>
            category
              .toLowerCase()
              .includes(this.state.currentSearchText.toLowerCase())
          )
          .slice(0, 10)
          .map(category => (
            <li onClick={() => this.props.AddPrefCategory(category)}>
              {category}
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
      <div className="PrefCategories">
        <h3>Categories Search</h3>
        <input type="text" name="search" onChange={this.onSearchChange} />
        {this.displayCategories()}
      </div>
    );
  }
}
export default PrefCategories;
