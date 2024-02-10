import React, { Component } from "react";

export const Badge = props => {
  return (
    <>
      <div className="block m-auto h-[6em] w-[20em] mb-4 bg-[red] text-center text-[white]">
        Hello <br />
        my name is
        <div className="bg-[white] text-[black]  font-bold h-[2em]">
          {props.name}
        </div>
      </div>
    </>
  );
};

export class BadgeClass extends Component<{ name: string }> {
  constructor(props: { name: "" }) {
    super(props);
  }
  render() {
    return (
      <>
        <div className="block m-auto h-[6em] w-[20em] mb-4 bg-[red] text-center text-[white]">
          Hello <br />
          my name is
          <div className="bg-[white] text-[black]  font-bold h-[2em]">
            {this.props.name}
          </div>
        </div>
      </>
    );
  }
}
