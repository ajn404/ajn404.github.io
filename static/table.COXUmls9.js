import{j as s}from"./jsx-runtime.C6v7sNnU.js";import{r as i}from"./index.A1bncjHG.js";import"./_sentry-release-injection-file.DwF5PoZy.js";import"./_commonjsHelpers.g73XWfsI.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},o=new t.Error().stack;o&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[o]="30f0c837-049b-44a2-b0ae-b5ef28470a14",t._sentryDebugIdIdentifier="sentry-dbid-30f0c837-049b-44a2-b0ae-b5ef28470a14")}catch{}})();const m=({columns:t,data:o})=>{const[n,g]=i.useState(o),[c,d]=i.useState({selectedRows:new Set,allSelected:!1});return{rows:n,columns:t,state:c,toggleRowSelection:e=>{d(a=>{const l=new Set(a.selectedRows);return l.has(e)?l.delete(e):l.add(e),{...a,selectedRows:l,allSelected:l.size===n.length}})},toggleAllSelection:()=>{d(e=>{const a=!e.allSelected,l=a?new Set(n.map((w,y)=>y)):new Set;return{...e,selectedRows:l,allSelected:a}})},getTableProps:()=>({}),getHeaderProps:()=>({}),getRowProps:(e,a)=>({key:a}),getCellProps:e=>({})}},f=({columns:t,data:o,options:n})=>{const{rows:g,state:c,toggleRowSelection:d,toggleAllSelection:p,getTableProps:u,getHeaderProps:b,getRowProps:h,getCellProps:S}=m({columns:t,data:o});return s.jsxs("table",{className:n?.className||"",...u(),children:[s.jsx("thead",{children:s.jsxs("tr",{...b(),children:[s.jsx("th",{children:s.jsx("input",{type:"checkbox",checked:c.allSelected,onChange:p})}),t.map((r,e)=>s.jsx("th",{children:r.header},e))]})}),s.jsx("tbody",{children:g.map((r,e)=>s.jsxs("tr",{...h(r,e),children:[s.jsx("td",{children:s.jsx("input",{type:"checkbox",checked:c.selectedRows.has(e),onChange:()=>d(e)})}),t.map((a,l)=>s.jsx("td",{...S(r[a.accessor]),children:r[a.accessor]},l))]},e))})]})},C=()=>{const t=[{name:"John Doe",age:28,country:"USA"},{name:"Jane Smith",age:34,country:"UK"},{name:"Sam Green",age:23,country:"Canada"}],o=[{header:"Name",accessor:"name"},{header:"Age",accessor:"age"},{header:"Country",accessor:"country"}],[n,g]=i.useState(t),[c,d]=i.useState({className:"my-table"});return i.useState([{label:"Filter by Country",name:"country",type:"select",value:"",options:[{label:"All",value:""},{label:"USA",value:"USA"},{label:"UK",value:"UK"},{label:"Canada",value:"Canada"}]}]),s.jsx("div",{children:s.jsx(f,{columns:o,data:n,options:c})})};export{C as default};
//# sourceMappingURL=table.COXUmls9.js.map