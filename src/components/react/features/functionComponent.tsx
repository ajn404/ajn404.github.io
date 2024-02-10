import React, { useState, useEffect, useReducer } from "react";

interface LifecycleExampleProps {
  initialCounter: number;
}

interface LifecycleExampleState {
  counter: number;
}

type Action = { type: "increment" } | { type: "decrement" };

const counterReducer = (
  state: LifecycleExampleState,
  action: Action
): LifecycleExampleState => {
  switch (action.type) {
    case "increment":
      return { ...state, counter: state.counter + 1 };
    case "decrement":
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

const LifecycleExample: React.FC<LifecycleExampleProps> = ({
  initialCounter,
}) => {
  const [state, dispatch] = useReducer(counterReducer, {
    counter: initialCounter,
  });

  useEffect(() => {
    console.log("Component Did Mount");

    return () => {
      console.log("Component Will Unmount");
    };
  }, []); // Empty dependency array means it runs once on mount and once on unmount

  useEffect(() => {
    console.log("Counter Value Changed:", state.counter);
  }, [state.counter]); // Runs whenever counter value changes

  const handleIncrement = () => {
    dispatch({ type: "increment" });
  };

  const handleDecrement = () => {
    dispatch({ type: "decrement" });
  };

  console.log("Render");

  return (
    <div>
      <h1>Counter: {state.counter}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default LifecycleExample;
