import React, { Component, type ReactNode } from "react";

// 定义 Mouse 组件的 props 类型
interface MouseProps {
  render: (state: MouseState) => ReactNode;
}

// 定义 Mouse 组件的 state 类型
interface MouseState {
  x: number;
  y: number;
}

class Mouse extends Component<MouseProps, MouseState> {
  constructor(props: MouseProps) {
    super(props);
    this.state = { x: 0, y: 0 };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    //  JavaScript 的鼠标事件处理中，clientX 和 clientY 属性用于获取鼠标指针相对于浏览器视口（viewport）的坐标
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  }

  render() {
    return (
      <div
        style={{ height: "100px", background: "black" }}
        onMouseMove={this.handleMouseMove}
      >
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default Mouse;
