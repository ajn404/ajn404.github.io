// This is a React Quiz from BFE.dev

import React, { useState, useEffect } from "react";

function A(props: { state: number }) {
  console.log("A");
  return <B />;
}

function B() {
  console.log("B");
  return <C />;
}

function C() {
  console.log("C");
  return null;
}

function D() {
  console.log("D");
  return null;
}

export default function App() {
  const [state, setState] = useState(0);
  useEffect(() => {
    setState(state => state + 1);
  }, []);
  console.log("App");
  return (
    <div>
      <A state={state} />
      <D />
    </div>
  );
}
