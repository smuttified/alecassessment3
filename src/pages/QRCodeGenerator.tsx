import React from "react";
import PageTemplate from "../template/PageTemplate";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

interface state {
  qrvalue: string
}

class QRCodeGenerator extends React.Component<{}, state> {

  constructor(props: {}) {
    super(props);

    this.state = {
      qrvalue: ""
    };

    this.updateState = this.updateState.bind(this);
  }

  updateState(qrvalue: string) {
    this.setState({ qrvalue });
  }

  componentDidMount(): void {
    this.updateState(window.location.origin);
  }


  render() {
    return <PageTemplate title="QR Code">
      <span className="d-flex justify-content-between align-items-center">
        <h1 className="mb-3 mb-lg-4">QR Code</h1>
      </span>
      <div className="p-3 p-lg-5 text-center d-flex flex-column align-items-center justify-content-center">
        <QRCode
          value={this.state.qrvalue}
          size={300}
        />
        <span className="p-3"></span>
        <Link to={this.state.qrvalue}>{this.state.qrvalue}</Link>
      </div>
    </PageTemplate>
  };
}

export default QRCodeGenerator;