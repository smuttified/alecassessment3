import React, { MouseEvent } from "react";
import "../assets/css/product.css";
import Vehicle from "../models/Vehicle";
import { Link } from "react-router-dom";
import Router from "../utilities/Router";

interface props {
    product: Vehicle;
    deleteClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

class ProductRow extends React.Component<props> {
    render() {
        return (
            <div className="row g-0 border-bottom row-hover">
                <div className="d-none d-lg-inline col-lg-4 p-0"><span className="p-2 d-inline-block">{this.props.product._id}</span></div>
                <div className="col-lg-2 p-0"><span className="p-2 d-inline-block">{this.props.product.name}</span></div>
                <div className="col-lg-4 p-0"><span className="p-2 d-inline-block ellipsis">{this.props.product.description}</span></div>
                <div className="col-4 col-lg-2 p-0 text-light text-end">
                    <span className="p-2 d-inline-block">
                        <Link to={Router.url("admin/rentables/" + this.props.product._id)} className="badge btn btn-primary rounded-0">Edit</Link>
                        &nbsp;
                        <button onClick={this.props.deleteClick} data-id={this.props.product._id} className="badge btn btn-danger rounded-0">Delete</button>
                    </span>
                </div>
            </div>
        );
    }
}

export default ProductRow;