import React from "react";

type props = {
  title: string;
};
type state = {
  count: number; // like this
};

class Header extends React.Component<props, state> {
  render() {
    return (
      <div className="header container p-3 px-lg-0 border-bottom border-danger mb-3">
        <img src="https://iuploads.scribblecdn.net/17f2dc0f-4aff-4b4e-95a2-889f4746469f/global/imagelib/austria-local/odd_logo.png?v=12192019155257"
          alt="logo" style={{ height: "69px" }} />
      </div>
    );
  }
}

export default Header;