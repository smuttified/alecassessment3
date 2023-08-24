import React, { ChangeEvent, FormEvent } from "react";
import PageTemplate from "../template/PageTemplate";
import Vehicle from "../models/Vehicle";
import Router from "../utilities/Router";
import { useNavigate } from "react-router-dom";

interface state {
  product: Vehicle;
  title: String;
}

class VehicleForm extends React.Component<{}, state> {

  navigate = useNavigate();

  constructor(props: {}) {
    super(props);

    this.state = {
      product: {
        name: "",
        image: "",
        description: ""
      },
      title: "Update Vehicle"
    };
    this.updateState = this.updateState.bind(this);
    this.name_Change = this.name_Change.bind(this);
    this.image_Change = this.image_Change.bind(this);
    this.description_Change = this.description_Change.bind(this);
    this.form_Submit = this.form_Submit.bind(this);
  }

  componentDidMount(): void {
    const path = window.location.pathname.split("/");

    if (path[3] !== "new") {
      fetch(Router.backend + "/admin/getVehicleInfo", Router.fetchOptions({ id: path[3] })).then(async response => {
        const result = await response.json();
        if (result.session === false) {
          this.navigate(Router.url("login"));
          return;
        }

        if (result.length) {
          this.updateState(this.state.title, result[0]);
        }
      });
    } else {
      this.updateState("Add New Vehicle", this.state.product);
    }
  }

  updateState(title: String, Vehicle: Vehicle) {
    this.setState({ title, product: Vehicle });
  }

  name_Change(e: ChangeEvent<HTMLInputElement>) {
    const state = this.state.product;
    state.name = e.target.value;
    this.updateState(this.state.title, state);
  };

  image_Change(e: ChangeEvent<HTMLInputElement>) {
    const state = this.state.product;
    state.image = e.target.value;
    this.updateState(this.state.title, state);
  };

  description_Change(e: ChangeEvent<HTMLTextAreaElement>) {
    const state = this.state.product;
    state.description = e.target.value;
    this.updateState(this.state.title, state);
  };

  form_Submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch(Router.backend + "/admin/saveVehicle", Router.fetchOptions(this.state.product)).then(async response => {
      const result = await response.json();
      if (result.session === false) {
        this.navigate(Router.url("login"));
        return;
      }

      if (result) {
        this.navigate(Router.url("admin"));
      }
    });

    return false;
  }

  render() {
    return (
      <PageTemplate title="Admin">
        <span className="d-flex justify-content-between align-items-center">
          <h1 className="mb-3 mb-lg-4">{this.state.title}</h1>
        </span>
        <form onSubmit={this.form_Submit} className="row g-3 justify-content-center">
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-12">
                <input type="text" onChange={this.name_Change} className="form-control border-dark rounded-0" defaultValue={this.state.product.name} placeholder="Name" />
              </div>
              <div className="col-12">
                <input type="text" onChange={this.image_Change} className="form-control border-dark rounded-0" defaultValue={this.state.product.image} placeholder="Image Link (Ex: https://www.cdn.com/car.png)" />
              </div>
              <div className="col-12">
                <textarea onChange={this.description_Change} className="form-control border-dark rounded-0" defaultValue={this.state.product.description} placeholder="Description"></textarea>
              </div>
              <div className="col-12">
                <button className="btn btn-dark rounded-0 d-block w-100">Save</button>
              </div>
            </div>
          </div>
        </form>
      </PageTemplate>
    );
  }
}

export default VehicleForm;
