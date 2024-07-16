import { useEffect } from "react";

export default () => {
  useEffect(() => {
    import("@stackblitz/sdk").then(module => {
      const sdk = module.default;
      sdk.embedProjectId("elementOrId", "github-znem39", {
        forceEmbedLayout: true,
        openFile: "app1/webpack.config.js",
        view: "editor",
        theme: "dark",
      });
    });
  });

  return (
    <>
      <div id="elementOrId"></div>
    </>
  );
};
