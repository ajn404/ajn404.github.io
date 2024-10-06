import React, { Component } from "react";

interface LifecycleExampleState {
  counter: number;
}

class LifecycleExample extends Component<{}, LifecycleExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      counter: 0,
    };
    console.log("Constructor");
  }

  static getDerivedStateFromProps(
    nextProps: {},
    nextState: LifecycleExampleState
  ) {
    console.log("getDerivedStateFromProps", nextProps, nextState);
    return null;
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  shouldComponentUpdate(nextProps: {}, nextState: LifecycleExampleState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    return true;
  }

  getSnapshotBeforeUpdate(prevProps: {}, prevState: LifecycleExampleState) {
    console.log("getSnapshotBeforeUpdate", prevProps, prevState);
    return null;
  }

  componentDidUpdate(
    prevProps: {},
    prevState: LifecycleExampleState,
    snapshot: null
  ) {
    console.log("componentDidUpdate", prevProps, prevState, snapshot);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  static getDerivedStateFromError(error: Error) {
    console.log("getDerivedStateFromError", error);
    return null;
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log("componentDidCatch", error, info);
  }

  handleIncrement = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1,
    }));
  };

  render() {
    return (
      <div>
        <h1>Counter: {this.state.counter}</h1>
        <button onClick={this.handleIncrement}>Increment</button>
      </div>
    );
  }
}

export default LifecycleExample;
