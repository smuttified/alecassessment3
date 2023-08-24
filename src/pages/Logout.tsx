import React from "react";
import PageTemplate from "../template/PageTemplate";
import Router from "../utilities/Router";
import Cookies from "universal-cookie";

interface state {
  login: boolean;
  username: string;
  password: string;
  access: boolean;
}

class Logout extends React.Component<{}, state> {

  componentDidMount(){
    new Cookies().remove("cookieid");
    window.location.replace(Router.url("admin"));
  };

  render() {
    return (
      <PageTemplate title="Logout">
        <h1>Logging out...</h1>
      </PageTemplate>
    );
  }
}

export default Logout;
