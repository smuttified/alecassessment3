import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";

interface props {
  title: string;
  children: any;
}

class PageTemplate extends React.Component<props> {
  render() {
    return (
      <div className="container-fluid p-0">
        <Menu />
        <Header title={this.props.title} />
        <div className="container">
          {this.props.children}
        </div>
        <p className="p-3"></p>
        <Footer />
      </div>
    );
  }
}

export default PageTemplate;