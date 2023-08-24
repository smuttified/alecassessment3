import React, { MouseEvent } from "react";
import PageTemplate from "../template/PageTemplate";
import Schedule from "../models/Schedule";
import BookingRow from "../template/BookingRow";
import Router from "../utilities/Router";
import { Link } from "react-router-dom";

interface state {
  products: Schedule[];
}

class BookingRecords extends React.Component<{}, state> {

  constructor(props: {}) {
    super(props);

    this.state = {
      products: [],
    };
    this.updateState = this.updateState.bind(this);
    this.fetchBookings = this.fetchBookings.bind(this);
  }

  updateState(rentables: Schedule[]) {
    this.setState({ products: rentables });
  }

  componentDidMount(): void {
    this.fetchBookings();
  }

  fetchBookings() {
    fetch(Router.backend + "/admin/getBookings", Router.fetchOptions()).then(async response => {
      const result = await response.json();
      if (result.session === false) {
        window.location.replace(Router.url("login"));
        return;
      }
      const products = document.getElementById("products");
      if (products) {
        products.innerHTML = "";
        if (result.length) {
          const rentables: Schedule[] = [];
          result.forEach(function (row: Schedule) {
            rentables.push(row);
          });
          this.updateState(rentables);
        }
      }
    });
  }

  render() {
    return (
      <PageTemplate title="Admin">
        <span className="d-flex justify-content-between align-items-center">
          <h1 className="mb-3 mb-lg-4">Vehicles</h1>
          <Link to={Router.url("admin")} className="btn btn-primary rounded-0">View Vehicles</Link>
        </span>
        <div className="row g-0 d-none d-lg-flex">
          <div className="col-2 bg-dark text-light"><span className="p-2 d-inline-block">Date</span></div>
          <div className="col-2 bg-dark text-light"><span className="p-2 d-inline-block">Requestor</span></div>
          <div className="col-3 bg-dark text-light"><span className="p-2 d-inline-block">Pickup</span></div>
          <div className="col-3 bg-dark text-light"><span className="p-2 d-inline-block">Destination</span></div>
          <div className="col-2 bg-dark text-light"><span className="p-2 d-inline-block">Vehicle</span></div>
        </div>
        <div className="row g-0" id="products">
          {
            this.state.products.map((product) => {
              return <BookingRow key={product._id} schedule={product} />
            })
          }
        </div>
      </PageTemplate>
    );
  }
}

export default BookingRecords;
