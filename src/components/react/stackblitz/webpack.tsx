export default () => {
  let click = () => {
    import("@stackblitz/sdk").then(module => {
      const sdk = module.default;
      sdk.embedProjectId("elementOrId", "github-znem39", {
        forceEmbedLayout: true,
        clickToLoad: true,
        openFile: "app1/webpack.config.js",
        theme: "dark",
      });
    });
  };
  return (
    <>
      <div
        className=" text-sky-300 font-sans cursor-pointer hover:underline underline-offset-8"
        onClick={click}
      >
        stackblitz{" "}
      </div>
      <div
        id="elementOrId"
        className=" w-full border-l-primary-accent-100"
      ></div>
    </>
  );
};
