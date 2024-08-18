document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      console.log("当前页面不可见");
    } else {
      console.clear();
      console.info(
        "%c ",
        `line-height:100px;padding-left:100px;background-repeat:no-repeat;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-50 -50 100 100' stroke='%231B2D37' fill='none'%3E%3Crect stroke-width='2' width='98' height='98' x='-49' y='-49' fill='%23d5f1ff'%3E%3C/rect%3E%3Cpolyline stroke-dasharray='10' pathLength='10' points='0.00001 0,-0.991793 -1.8173446,-2.2402741 3.4823486,6.1949453 0.4474444,-3.4331809 -7.5362848,-6.2133014 8.2797801,12.2932314 1.7851273,-5.0423611 -13.5870507,-10.8698086 12.4970611,18.1990361 3.9991341,-5.7863618 -19.8785691,-16.1450444 16.0621084,23.818206 7.0663947,-5.6410665 -26.3168978,-21.9675334 18.9092802,29.059075 10.9548628,-4.591445 -32.806032,-28.2596767 20.9799619,33.8332657 15.6237668,-2.6317133 -39.248728,-34.9384013 22.223098,38.056466 21.0239282,0.2345778 -45.5473393,-41.915853 22.5956673,41.6491767 27.0981467,3.9945268 -51.6046566,-49.1001299 22.0630962,44.5374235 33.7816489,8.6259382 -57.3247487,-56.3960484 20.5996079,46.653429 41.0025973,14.0974514 -62.6137955,-63.7059392 18.188505,47.9362389 48.6826567,20.368742 -67.3809088,-70.9304643 14.8223821,48.3322984 56.7376131,27.3907928 -71.5389343,-77.9694531 10.5032683,47.7959744 65.0780416,35.1062339 -75.0052279,-84.7227478 5.2426967,46.2900186 73.6100184,43.4497494 -77.7024033,-91.0910542 -0.9382987,43.7859697 82.2358716,52.3485481 -79.559042,-96.9767918 -8.0092596,40.2644891 90.8549658,61.7228942 -80.5103629,-102.2849352 -15.9304529,35.7156303 99.3645155,71.4866962 -80.4988455,-106.9238436 -24.6530929,30.1390368 107.66042,81.5481482 -79.474802,-110.8060694 -34.1196343,23.5440691 115.6381161,91.8104205 -77.396894,-113.8491417 -44.264135,15.9498573 123.1934404'%3E%3Canimate attributeName='stroke-dashoffset' from='10' to='0' dur='10s'%3E%3C/animate%3E%3C/polyline%3E%3C/svg%3E")`
      );
    }
  });

  const header = document.getElementById("page-header");
  const headerHeight = header && header.offsetHeight;
  document.documentElement.style.setProperty(
    "--header-height",
    `${headerHeight}px`
  );

  // 打印前的处理函数
  function handlePrint(open: boolean) {
    let target = document.querySelectorAll("details");
    target.forEach((el: HTMLDetailsElement) => (el.open = open));
  }

  // 监听打印事件
  window.addEventListener("beforeprint", handlePrint.bind(null, true));
  window.addEventListener("afterprint", handlePrint.bind(null, false));

  setTimeout(() => {
    const links: NodeListOf<HTMLAnchorElement> =
      document.querySelectorAll("a.card");
    links.forEach(link => {
      link.addEventListener("mouseover", () => {
        // 创建一个 <link> 元素用于预加载
        requestIdleCallback(() => {
          // 创建一个 <link> 元素用于预加载
          const prefetchLink = document.createElement("link");
          prefetchLink.rel = "prefetch";
          prefetchLink.href = link.href; // 获取链接的 href
          document.head.appendChild(prefetchLink); // 将 <link> 添加到文档头部
        });
      });
    });
  }, 2000);
});
