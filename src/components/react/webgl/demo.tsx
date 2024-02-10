import { useParticle } from "./useParticle.tsx";

export default () => {
  useParticle();

  return (
    <div className="demo ">
      <canvas
        id="canvas1"
        className="m-auto"
        style={{
          background:
            "linear-gradient(to right,rgb(251, 254, 251),rgb(33, 39, 55));",
        }}
      ></canvas>
      <img
        className="hidden w-[200px]"
        src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDg4LjU5OTk2MDMyNzE0ODQ0IDcwIiB3aWR0aD0iMTc3LjE5OTkyMDY1NDI5Njg4IgogICAgaGVpZ2h0PSIxNDAiPgogICAgPCEtLSBzdmctc291cmNlOmV4Y2FsaWRyYXcgLS0+CgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlIGNsYXNzPSJzdHlsZS1mb250cyI+CiAgICAgICAgICAgIEBmb250LWZhY2UgewogICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6ICJWaXJnaWwiOwogICAgICAgICAgICAgICAgc3JjOiB1cmwoImh0dHBzOi8vZXhjYWxpZHJhdy5jb20vVmlyZ2lsLndvZmYyIik7CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIEBmb250LWZhY2UgewogICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6ICJDYXNjYWRpYSI7CiAgICAgICAgICAgICAgICBzcmM6IHVybCgiaHR0cHM6Ly9leGNhbGlkcmF3LmNvbS9DYXNjYWRpYS53b2ZmMiIpOwogICAgICAgICAgICB9CiAgICAgICAgPC9zdHlsZT4KCiAgICA8L2RlZnM+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMCAxMCkgcm90YXRlKDAgMzQuMjk5OTgwMTYzNTc0MjIgMjUpIj4KICAgICAgICA8dGV4dCB4PSIwIiB5PSIwIiBmb250LWZhbWlseT0iVmlyZ2lsLCBTZWdvZSBVSSBFbW9qaSIgZm9udC1zaXplPSIyMHB4IiBmaWxsPSIjMWUxZTFlIiB0ZXh0LWFuY2hvcj0ic3RhcnQiCiAgICAgICAgICAgIHN0eWxlPSJ3aGl0ZS1zcGFjZTogcHJlOyIgZGlyZWN0aW9uPSJsdHIiIGRvbWluYW50LWJhc2VsaW5lPSJ0ZXh0LWJlZm9yZS1lZGdlIj5ham40MDQ8L3RleHQ+CgogICAgPC9nPgo8L3N2Zz4="
        id="image1"
      />

      <div className="controls text-center">
        <button id="wrapButton" className="m-[20px] p-[20px] font-mono text-lg">
          Wrap
        </button>
        <button id="start" className="m-[20px] p-[20px] font-mono text-lg">
          init
        </button>
      </div>
    </div>
  );
};
