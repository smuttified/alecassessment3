import React from "react";
import "../assets/css/footer.css";
import { Link } from "react-router-dom";
import Router from "../utilities/Router";
import Cookies from "universal-cookie";

interface state {
    isloggedin: boolean;
}

class Footer extends React.Component<{}, state> {

    constructor(props: {}) {
        super(props);

        this.state = {
            isloggedin: false
        };
        this.updateState = this.updateState.bind(this);
    }

    updateState(isloggedin: boolean) {
        this.setState({ isloggedin });
    }

    componentDidMount(): void {
        this.setState({ isloggedin: new Cookies().get("cookieid") });
    }

    render() {
        return (
            <footer className="footer p-3 p-lg-5 bg-dark text-light">
                <div className="row g-3 g-lg-5">
                    <div className="col-lg-4">
                        <b>PAGES</b>
                        <Link className="no-decoration" to={Router.homepage}>Homepage</Link>
                        <Link className="no-decoration" to={Router.url("qrcode")}>Show QR Code</Link>
                        <hr />
                        {this.state.isloggedin ? <Link className="no-decoration" to={Router.url("admin")}>Admin Dashboard</Link> : ""}
                        {this.state.isloggedin ? <Link className="no-decoration" to={Router.url("logout")}>Logout</Link> : <Link className="no-decoration" to={Router.url("login")}>Login</Link>}
                    </div>
                    <div className="col-lg-4">
                        <img src="https://iuploads.scribblecdn.net/17f2dc0f-4aff-4b4e-95a2-889f4746469f/global/imagelib/austria-local/odd_logo.png?v=12192019155257"
                            alt="logo" style={{ height: "59px" }} />
                        <hr />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;