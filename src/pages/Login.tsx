import React, { ChangeEvent, FormEvent } from "react";
import PageTemplate from "../template/PageTemplate";
import Router from "../utilities/Router";
import Cookies from "universal-cookie";

interface state {
  login: boolean;
  username: string;
  password: string;
  access: boolean;
}

class Login extends React.Component<{}, state> {

  constructor(props: {}) {
    super(props);

    this.state = {
      login: false,
      username: "",
      password: "",
      access: false
    };
    this.updateState = this.updateState.bind(this);
    this.username_Change = this.username_Change.bind(this);
    this.password_Change = this.password_Change.bind(this);
    this.form_Submit = this.form_Submit.bind(this);
  }

  updateState(login: boolean, username: string, password: string, access: boolean) {
    this.setState({ login, username, password, access });
  }

  username_Change(e: ChangeEvent<HTMLInputElement>) {
    this.updateState(false, e.target.value, this.state.password, false);
  }

  password_Change(e: ChangeEvent<HTMLInputElement>) {
    this.updateState(false, this.state.username, e.target.value, false);
  }

  form_Submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    this.updateState(false, this.state.username, this.state.password, true);

    fetch(Router.backend + "/authentication", Router.fetchOptions({ username: this.state.username, password: this.state.password })).then(async response => {
      const result = await response.json();

      if (result.session) {
        new Cookies().set("cookieid", result.id);
        Router.navigate(Router.url("admin"));
      } else {
        this.updateState(true, this.state.username, this.state.password, false);
      }
    });

    return false;
  }

  render() {
    return (
      <PageTemplate title="Login">
        <h1 className="mb-3 mb-lg-4">Login</h1>
        <div className="row g-3 g-lg-5 justify-content-center align-items-center" style={{ minHeight: "500px;" }} id="products">
          <div className="col-lg-6 h-100">
            <form className="row g-3 p-lg-5 p-3" onSubmit={this.form_Submit}>
              <div className="col-12">
                <input onChange={this.username_Change} className="form-control border-dark rounded-0" type="text" placeholder="Username" />
              </div>
              <div className="col-12">
                <input onChange={this.password_Change} className="form-control border-dark rounded-0" type="password" placeholder="Password" />
              </div>
              <div className="col-12">
                <input className="btn btn-dark rounded-0 d-block col-12" type="submit" value="Login" />
                <p className={!this.state.access && this.state.login ? "alert mt-3 border border-danger text-danger text-center mb-0" : "d-none"}>
                  Invalid Username / Password
                </p>
                <p className={this.state.access && !this.state.login ? "alert mt-3 border border-info text-info text-center mb-0" : "d-none"}>
                  Logging in... Please wait...
                </p>
              </div>
            </form>
          </div>
        </div>
      </PageTemplate>
    );
  }
}

export default Login;
