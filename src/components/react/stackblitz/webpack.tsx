import { useEffect } from "react";

export default () => {
  useEffect(() => {
    import("@stackblitz/sdk").then(module => {
      const sdk = module.default;
      sdk.embedProjectId("elementOrId", "github-znem39", {
        forceEmbedLayout: true,
        clickToLoad: true,
        openFile: "app1/webpack.config.js",
        theme: "dark",
      });
    });
  });
  return (
    <>
      <div
        id="elementOrId"
        className=" w-full border-l-primary-accent-100"
      ></div>
    </>
  );
};
