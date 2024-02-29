// This is a React Quiz from BFE.dev

import { Suspense } from "react";

const resource = (() => {
  let data = null;
  let status = "pending";
  let fetcher = null;
  return {
    get() {
      if (status === "ready") {
        return data;
      }
      if (status === "pending") {
        fetcher = new Promise((resolve, reject) => {
          setTimeout(() => {
            data = "success";
            status = "ready";
            resolve("success");
          }, 100);
        });
        status = "fetching";
      }

      throw fetcher;
    },
  };
})();

function A() {
  console.log("SuspenseB A1");
  const data = resource.get();
  console.log("SuspenseB A2");
  return <p>{data}</p>;
}

function B() {
  console.log("SuspenseB B");
  return null;
}

function Fallback() {
  console.log("SuspenseB fallback");
  return null;
}

export default () => {
  console.log("SuspenseB App");
  return (
    <div>
      <Suspense fallback={<Fallback />}>
        <A />
        <B />
      </Suspense>
    </div>
  );
};

/* 
App
A1
B
fallback
A1
A2
B
*/
