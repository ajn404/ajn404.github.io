// This is a React Quiz from BFE.dev

import React, { useState, useEffect } from "react";

function A(props: { state: number }) {
  console.log("reRender A");
  return <B />;
}

function B() {
  console.log("reRender B");
  return <C />;
}

function C() {
  console.log("reRender C");
  return null;
}

function D() {
  console.log("reRender D");
  return null;
}

export default function App() {
  const [state, setState] = useState(0);
  useEffect(() => {
    setState(state => state + 1);
  }, []);
  console.log("reRender App");
  return (
    <div>
      <A state={state} />
      <D />
    </div>
  );
}
