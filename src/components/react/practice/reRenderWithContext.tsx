import { useState, createContext, useEffect, useContext } from "react";

const MyContext = createContext(0);

function B({ children }) {
  const count = useContext(MyContext);
  console.log("B");
  return children;
}

const A = ({ children }) => {
  const [state, setState] = useState(0);
  console.log("A");
  useEffect(() => {
    setState(state => state + 1);
  }, []);
  return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
};

function C() {
  console.log("C");
  return null;
}

function D() {
  console.log("D");
  return null;
}
export default () => {
  console.log("App");
  return (
    <A>
      <B>
        <C />
      </B>
      <D />
    </A>
  );
};
