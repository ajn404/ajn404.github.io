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
            resolve(null);
          }, 1000);
        });
        status = "fetching";
      }

      throw fetcher;
    },
  };
})();

function A() {
  console.log("suspenseA A1");
  const data = resource.get();
  console.log("suspenseA A2");
  return <p>{data}</p>;
}

function Fallback() {
  console.log("suspenseA fallback");
  return null;
}

export default () => {
  console.log("suspenseA App");
  return (
    <div>
      <Suspense fallback={<Fallback />}>
        <A />
      </Suspense>
    </div>
  );
};
