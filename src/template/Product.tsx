import React from "react";
import "../assets/css/product.css";
import Router from "../utilities/Router";
import { Link } from "react-router-dom";

interface props {
    title: string;
    image: string;
    description: string;
};

class Product extends React.Component<props> {
    render() {
        return (
            <div className="col-lg-4">
                <div className="card rounded-2 border-0 overflow-hidden">
                    <div className="card-body rounded-2" data-image={this.props.image} style={{ backgroundImage: "url('" + this.props.image + "')" }}></div>
                    <div className="card-footer border-0 bg-transparent px-0">
                        {this.props.title}
                        <p className="text-silver">
                            {this.props.description}
                        </p>
                        <Link className="stretched-link" to={Router.url("book/" + this.props.title)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;