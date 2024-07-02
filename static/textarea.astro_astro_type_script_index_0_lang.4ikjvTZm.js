document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("select-button");t&&t.addEventListener("click",()=>{const e=document.getElementById("textarea");if(!e)return;const n=e.value.split(`
`),c=2,s=n.slice(0,c).reduce((d,l)=>d+l.length+1,0),o=s+n[c].length;e.focus(),e.setSelectionRange(s,o)})});
