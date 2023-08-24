import React from "react";
import Router from "../utilities/Router";
import { Link } from "react-router-dom";

class Header extends React.Component<{}> {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">On-Demand Delivery</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href={Router.homepage}>Home</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={Router.url("book")}>Book Now</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;