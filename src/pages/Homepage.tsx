import React from "react";
import PageTemplate from "../template/PageTemplate";
import Product from "../template/Product";
import Router from "../utilities/Router";
import Vehicle from "../models/Vehicle";

interface state {
  productState: boolean;
  productList: Vehicle[];
}

class Homepage extends React.Component<{}, state> {
  constructor(props: {}) {
    super(props);

    this.state = {
      productState: false,
      productList: []
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(value: boolean, list: Vehicle[]) {
    this.setState({ productState: value, productList: list });
  }

  componentDidMount(): void {
    if (!this.state.productState) {
      fetch(Router.backend + "/getVehicles", { method: "POST" }).then(async response => {
        const result = await response.json();
        const products = document.getElementById("products");
        if (products) {
          products.innerHTML = "";
          if (result.length) {
            const rentables: Vehicle[] = [];
            result.forEach(function (row: Vehicle) {
              rentables.push(row);
            });
            this.updateState(this.state.productState, rentables);
          } else {
            this.updateState(true, this.state.productList);
          }
        }
      });
    }
  };

  render() {
    return (
      <PageTemplate title="Homepage">
        <div className="position-relative bg-primary rounded-2 p-5" style={{overflow:"hidden"}}>
          <span className="display-4 text-light">Express Delivery</span>
          &nbsp;
          <span className="text-warning display-1 ms-3">24/7</span>
          <img className="position-absolute" alt="banner-img" style={{height:"125%", top:"-15%", right:"-5%"}} src="https://www.freepnglogos.com/uploads/truck-png/truck-delivery-options-3.png"/>
        </div>
        <p className="p-3"></p>
        <div className="row g-3 g-lg-5" id="products">
          {this.state.productList.map((row: Vehicle) => <Product key={row._id} title={row.name} image={row.image} description={row.description} />)}
        </div>
        <p className={this.state.productState ? "alert border border-danger rounded-2 text-center text-danger" : "d-none"}>No Rentables Found</p>
      </PageTemplate>
    );
  }
}

export default Homepage;
