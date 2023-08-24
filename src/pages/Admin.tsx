import React, { MouseEvent } from "react";
import PageTemplate from "../template/PageTemplate";
import Vehicle from "../models/Vehicle";
import ProductRow from "../template/ProductRow";
import Router from "../utilities/Router";
import { Link } from "react-router-dom";

interface state {
  products: Vehicle[];
  modal: boolean;
  selectdId: String;
}

class Admin extends React.Component<{}, state> {

  constructor(props: {}) {
    super(props);

    this.state = {
      products: [],
      modal: false,
      selectdId: ""
    };
    this.updateState = this.updateState.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.yes_Click = this.yes_Click.bind(this);
    this.no_Click = this.no_Click.bind(this);
    this.fetchVehicles = this.fetchVehicles.bind(this);
  }

  updateState(rentables: Vehicle[], modal: boolean, selectdId: String) {
    this.setState({ products: rentables, modal, selectdId });
  }

  componentDidMount(): void {
    this.fetchVehicles();
  }

  fetchVehicles() {
    fetch(Router.backend + "/admin/getVehicles", Router.fetchOptions()).then(async response => {
      const result = await response.json();
      if (result.session === false) {
        Router.navigate(Router.url("login"));
        return;
      }
      const products = document.getElementById("products");
      if (products) {
        products.innerHTML = "";
        if (result.length) {
          const rentables: Vehicle[] = [];
          result.forEach(function (row: Vehicle) {
            rentables.push(row);
          });
          this.updateState(rentables, this.state.modal, this.state.selectdId);
        }
      }
    });
  }

  deleteClick(e: MouseEvent<HTMLButtonElement>) {
    const btn: HTMLButtonElement = e.target as HTMLButtonElement;
    this.updateState(this.state.products, true, btn.dataset.id + "");
  }

  yes_Click(e: MouseEvent<HTMLButtonElement>) {
    const btn: HTMLButtonElement = e.target as HTMLButtonElement;
    const productid: String = btn.dataset.id + "";
    fetch(Router.backend + "/admin/deleteVehicle", Router.fetchOptions({ id: productid })).then(async response => {
      const result = await response.json();
      if (result.session === false) {
        Router.navigate(Router.url("login"));
        return;
      }
      const products: Vehicle[] = [];
      this.state.products.forEach(function (product: Vehicle) {
        if (product._id !== productid) {
          products.push(product);
        }
      });
      this.updateState(products, false, "");
    });

    this.no_Click(e);
  }

  no_Click(e: MouseEvent<HTMLButtonElement>) {
    this.updateState(this.state.products, false, "");
  }

  render() {
    return (
      <PageTemplate title="Admin">
        <span className="d-flex justify-content-between align-items-center">
          <h1 className="mb-3 mb-lg-4">Vehicles</h1>
          <span>
            <Link to={Router.url("admin/rentables/new")} className="btn btn-primary rounded-0">Add New</Link>
            <span className="p-1"></span>
            <Link to={Router.url("admin/bookings")} className="btn btn-success rounded-0">View Records</Link>
          </span>
        </span>
        <div className="row g-0 d-none d-lg-flex">
          <div className="col-4 bg-dark text-light"><span className="p-2 d-inline-block">ID</span></div>
          <div className="col-2 bg-dark text-light"><span className="p-2 d-inline-block">Name</span></div>
          <div className="col-4 bg-dark text-light"><span className="p-2 d-inline-block">Description</span></div>
          <div className="col-2 bg-dark text-light text-center"><span className="p-2 d-inline-block">Actions</span></div>
        </div>
        <div className="row g-0" id="products">
          {
            this.state.products.map((product) => {
              return <ProductRow key={product._id} product={product} deleteClick={this.deleteClick} />
            })
          }
        </div>
        <div className={this.state.modal ? "modal-backdrop show" : "d-none"}></div>
        <div className={this.state.modal ? "modal fade show d-block" : "d-none"}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <span className="modal-title">Delete Record?</span>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this record?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" data-id={this.state.selectdId} onClick={this.yes_Click}>Yes</button>
                <button className="btn btn-outline-dark" onClick={this.no_Click}>No</button>
              </div>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }
}

export default Admin;
