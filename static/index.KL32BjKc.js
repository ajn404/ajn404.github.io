(function(){try{var r=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},a=new r.Error().stack;a&&(r._sentryDebugIds=r._sentryDebugIds||{},r._sentryDebugIds[a]="4ca3691b-3495-40e0-8658-2d71f165c7c8",r._sentryDebugIdIdentifier="sentry-dbid-4ca3691b-3495-40e0-8658-2d71f165c7c8")}catch{}})();var o={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},i={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"'},n=typeof navigator<"u"&&/Mac/.test(navigator.platform),d=typeof navigator<"u"&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);for(var e=0;e<10;e++)o[48+e]=o[96+e]=String(e);for(var e=1;e<=24;e++)o[e+111]="F"+e;for(var e=65;e<=90;e++)o[e]=String.fromCharCode(e+32),i[e]=String.fromCharCode(e);for(var f in o)i.hasOwnProperty(f)||(i[f]=o[f]);function s(r){var a=n&&r.metaKey&&r.shiftKey&&!r.ctrlKey&&!r.altKey||d&&r.shiftKey&&r.key&&r.key.length==1||r.key=="Unidentified",t=!a&&r.key||(r.shiftKey?i:o)[r.keyCode]||r.key||"Unidentified";return t=="Esc"&&(t="Escape"),t=="Del"&&(t="Delete"),t=="Left"&&(t="ArrowLeft"),t=="Up"&&(t="ArrowUp"),t=="Right"&&(t="ArrowRight"),t=="Down"&&(t="ArrowDown"),t}export{o as b,s as k,i as s};
//# sourceMappingURL=index.KL32BjKc.js.map