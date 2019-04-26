import React from "react";
import {
  Grommet,
  Box,
  Button,
  Image,
  Accordion,
  AccordionPanel,
  Text,
  Heading
} from "grommet";

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      preference_categories: [],
      current_ingredient: null,
      image: ""
    };
  }

  componentDidMount() {
    this.loadProduct();
  }

  loadProduct() {
    const pid = window.location.pathname.split("/")[
      window.location.pathname.split("/").length - 1
    ];
    fetch("http://localhost:8081/product/" + pid)
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log(json);
        this.setState({
          image: "data:image/jpeg;base64," + json.img_url,
          product: json.contents
        });
      })
      .catch(console.log);
  }

  displayIngredient() {
    if (this.state.current_ingredient) {
      return (
        <Box
          width="80%"
          height="80%"
          background="white"
          pad="small"
          border={{
            color: "brand",
            size: "medium"
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1
          }}
        >
          <Heading level="3">{this.state.current_ingredient}</Heading>
          <Text>
            {this.state.product.ingredients[this.state.current_ingredient]}
          </Text>
          <Button
            label="Close"
            onClick={() => this.setState({ current_ingredient: null })}
          />
        </Box>
      );
    } else {
      return <br />;
    }
  }

  render() {
    if (this.state.product.ingredients === undefined) {
      return <Heading level="2">Loading...</Heading>;
    }
    return (
      <React.Fragment>
        <Box
          direction="column"
          border={{ color: "brand", size: "large" }}
          pad="medium"
        >
          <Image src={this.state.image} width="100%" />
        </Box>
        <Button label="Save" />
        <Text>
          Alarm ingredients:{" "}
          {this.state.product.alarm_ingredients.map(x => (
            <span>{x} </span>
          ))}
        </Text>
        <Accordion>
          {Object.keys(this.state.product.categories).map(category => {
            const color = this.state.preference_categories.includes(category)
              ? "orange"
              : "white";
            return (
              <AccordionPanel
                label={category}
                background={{ color: color, opacity: 0.6 }}
              >
                {this.state.product.categories[category].map(ingredient => {
                  if (
                    this.state.product.alarm_ingredients.includes(ingredient)
                  ) {
                    return (
                      <Text
                        onClick={() =>
                          this.setState({ current_ingredient: ingredient })
                        }
                        color="brand"
                      >
                        {ingredient}
                      </Text>
                    );
                  } else {
                    return (
                      <Text
                        onClick={() =>
                          this.setState({ current_ingredient: ingredient })
                        }
                      >
                        {ingredient}
                      </Text>
                    );
                  }
                })}
              </AccordionPanel>
            );
          })}
        </Accordion>
        {this.displayIngredient()}
      </React.Fragment>
    );
  }
}

export default Product;
