import{j as a}from"./jsx-runtime.eyAvPMM5.js";import"./index.-CUiy3Z4.js";import{c as e}from"./utils.aQmm6d3C.js";import{m as d}from"./motion.DXaymX4J.js";import"./_commonjsHelpers.4gQjN7DL.js";const o=({className:r,children:t,showRadialGradient:i=!0,...n})=>a.jsx("main",{children:a.jsxs("div",{className:e("relative flex flex-col  h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900  text-slate-950 transition-bg",r),...n,children:[a.jsx("div",{className:"absolute inset-0 overflow-hidden",children:a.jsx("div",{className:e(`
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50`,i&&"[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]")})}),t]})});function v(){return a.jsx(o,{children:a.jsxs(d.div,{initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},transition:{delay:.3,duration:.8,ease:"easeInOut"},className:"relative flex flex-col gap-4 items-center justify-center px-4",children:[a.jsx("div",{className:"text-3xl md:text-7xl font-bold dark:text-white text-center",children:"Background lights are cool you know."}),a.jsx("div",{className:"font-extralight text-base md:text-4xl dark:text-neutral-200 py-4",children:"And this, is chemical burn."}),a.jsx("button",{className:"bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2",children:"Debug now"})]})})}export{v as default};
