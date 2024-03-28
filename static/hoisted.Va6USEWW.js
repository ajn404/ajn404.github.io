import{_ as o}from"./preload-helper.hlDPvxQM.js";import"./hoisted.v6M0quUo.js";const{signIn:t,signOut:i}=await o(()=>import("./client.zqlkSgw6.js"),__vite__mapDeps([]));document.querySelector("#login").onclick=()=>t("github");document.querySelector("#logout").onclick=()=>i();
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
