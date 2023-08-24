import React, { ChangeEvent, FormEvent } from "react";
import PageTemplate from "../template/PageTemplate";
import Router from "../utilities/Router";
import Schedule from "../models/Schedule";
import Result from "../models/Result";
import Vehicle from "../models/Vehicle";

interface state {
  product: Vehicle;
  booking: Schedule;
  result: Result;
}

class Booking extends React.Component<{}, state> {

  constructor(props: {}) {
    super(props);

    this.state = {
      booking: {
        name: "",
        contact_number: "",
        date: new Date(),
        destination_location: "",
        helper: 0,
        pickup_location: "",
        time: 0,
        vehicle_id: "",
      },
      product: {
        description: "",
        image: "",
        name: ""
      },
      result: {
        status: "",
        message: ""
      }
    };

    this.updateState = this.updateState.bind(this);
    this.name_Change = this.name_Change.bind(this);
    this.phone_Change = this.phone_Change.bind(this);
    this.pickup_Change = this.pickup_Change.bind(this);
    this.destination_Change = this.destination_Change.bind(this);
    this.helper_Change = this.helper_Change.bind(this);
    this.date_Change = this.date_Change.bind(this);
    this.time_Change = this.time_Change.bind(this);
    this.form_Submit = this.form_Submit.bind(this);
  }

  updateState(list: Vehicle, result: Result, booking: Schedule) {
    this.setState({ product: list, result, booking });
  }

  componentDidMount(): void {
    const params = window.location.pathname.split("/");

    fetch(Router.backend + "/getVehicleInfo", Router.fetchOptions({ name: params[2] })).then(async response => {
      const result = await response.json();
      const products = document.getElementById("products");
      if (products) {
        if (result.length) {
          this.updateState(result[0], this.state.result, {
            name: "",
            contact_number: "",
            date: new Date(),
            destination_location: "",
            helper: 0,
            pickup_location: "",
            time: 0,
            vehicle_id: params[2],
          });
        }
      }
    });
  };

  name_Change(e: ChangeEvent<HTMLInputElement>) {
    const state = this.state.booking;
    state.name = e.target.value;
    this.updateState(this.state.product, this.state.result, state);
  }

  phone_Change(e: ChangeEvent<HTMLInputElement>) {
    const state = this.state.booking;
    state.contact_number = e.target.value;
    this.updateState(this.state.product, this.state.result, state);
  }

  pickup_Change(e: ChangeEvent<HTMLInputElement>) {
    const state = this.state.booking;
    state.pickup_location = e.target.value;
    this.updateState(this.state.product, this.state.result, state);
  }

  destination_Change(e: ChangeEvent<HTMLInputElement>) {
    const state = this.state.booking;
    state.destination_location = e.target.value;
    this.updateState(this.state.product, this.state.result, state);
  }

  helper_Change(e: ChangeEvent<HTMLInputElement>) {
    const state = this.state.booking;
    state.helper = parseInt(e.target.value);
    this.updateState(this.state.product, this.state.result, state);
  }

  date_Change(e: ChangeEvent<HTMLInputElement>) {
    const state = this.state.booking;
    state.date = new Date(e.target.value);
    this.updateState(this.state.product, this.state.result, state);
  }

  time_Change(e: ChangeEvent<HTMLSelectElement>) {
    const state = this.state.booking;
    state.time = parseInt(e.target.value);
    this.updateState(this.state.product, this.state.result, state);
  }

  form_Submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch(Router.backend + "/saveBooking", Router.fetchOptions(this.state.booking)).then(async response => {
      const result = await response.json();

      this.updateState(this.state.product, result, this.state.booking);
    });

    return false;
  }

  render() {
    return (
      <PageTemplate title={"Book " + this.state.product.name}>
        <h1 className="mb-3 mb-lg-4">Book {this.state.product.name}</h1>
        <div className="row g-3 g-lg-5" style={{ minHeight: "300px" }} id="products">
          <div className="col-lg-6 h-100">
            <img className="img rounded-2 w-100 h-auto" src={this.state.product.image} alt="rentable-img" />
            <p className="p-3"></p>
            <p className="text-silver">{this.state.product.description}</p>
          </div>
          <div className="col-lg-6 h-100">
            <form className="row g-3 p-lg-5 p-3" onSubmit={this.form_Submit}>
              <div className="col-12">
                <input onChange={this.name_Change} className="form-control border-dark rounded-0" type="text" placeholder="Full Name" />
              </div>
              <div className="col-12">
                <input onChange={this.phone_Change} className="form-control border-dark rounded-0" type="text" placeholder="Contact Number" />
              </div>
              <div className="col-12">
                <input onChange={this.pickup_Change} className="form-control border-dark rounded-0" type="text" placeholder="Pickup Location" />
              </div>
              <div className="col-12">
                <input onChange={this.destination_Change} className="form-control border-dark rounded-0" type="text" placeholder="Destination Location" />
              </div>
              <div className="col-12">
                <input onChange={this.helper_Change} className="form-control border-dark rounded-0" type="number" placeholder="Number of Helper" />
              </div>
              <div className="col-12">
                <input onChange={this.date_Change} className="form-control border-dark rounded-0" type="date" placeholder="Pickup Date" />
              </div>
              <div className="col-12">
                <select onChange={this.time_Change} className="form-control border-dark rounded-0">
                  {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(function (r) {
                    return <option value={r}>{r}:00</option>
                  })}
                </select>
              </div>
              <div className="col-12">
                <p className={this.state.result.message ? ("alert text-center " + (this.state.result.status === "success" ? "text-success border-success" : "text-danger border-danger")) : "d-none"}>
                  {this.state.result.message}
                </p>
                <input className="btn btn-dark rounded-0 d-block col-12" type="submit" value="Place Schedule" />
              </div>
            </form>
          </div>
        </div >
      </PageTemplate >
    );
  }
}

export default Booking;
