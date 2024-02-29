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
            data = 1;
            status = "ready";
            resolve("res");
          }, 100);
        });
        status = "fetching";
      }

      throw fetcher;
    },
  };
})();

function A() {
  console.log("A1");
  const data = resource.get();
  console.log("A2");
  return <p>{data}</p>;
}

function Fallback() {
  console.log("fallback");
  return null;
}

export default () => {
  console.log("App");
  return (
    <div>
      <Suspense fallback={<Fallback />}>
        <A />
      </Suspense>
    </div>
  );
};
