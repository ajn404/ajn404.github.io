import { useEffect, useRef, useState } from "react";
import "./scrollSelect.scss";

const ScrollSelect = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = itemsRef.current.indexOf(entry.target);
            setSelectedIndex(index);
          }
        });
      },
      {
        root: document.querySelector(`.scroll-container`),
        rootMargin: `-51% 0px -49% 0px`,
      }
    );

    itemsRef.current.forEach(item => observer.observe(item));

    return () => {
      observer.disconnect(); // 清理观察者
    };
  }, []);

  return (
    <div className="scroll-base-container">
      <section className="scroll-container">
        {[
          { title: "2024年10月", path: "/posts/2024-10" },
          { title: "2024年9月", path: "/posts/2024-09" },
          { title: "2024年8月", path: "/posts/2024-08" },
          { title: "ffmpeg", path: "/posts/ffmpeg" },
          { title: "nvim", path: "/posts/nvim" },
          { title: "echarts相关", path: "/posts/echarts" },
          { title: "books", path: "/posts/books" },
          { title: "2024年7月", path: "/posts/2024-07" },
          {
            title: "cesium and other tech in 某个安全管理公司",
            path: "/posts/bad",
          },
          { title: "cicd", path: "/posts/cicd" },
          { title: "mdn http 学习", path: "/posts/mdn_http" },
          { title: "interview(2)", path: "/posts/interview2" },
          { title: "uniapp非项目级探索", path: "/posts/uniapp" },
          { title: "2024年6月记录", path: "/posts/2024-06" },
          { title: "2024年5月记录", path: "/posts/2024-05" },
          { title: "algorithm", path: "/posts/algorithm" },
          { title: "2024年4月记录", path: "/posts/2024-04" },
          { title: "报告", path: "/posts/报告" },
          { title: "gemini问答", path: "/posts/gemini问答" },
          { title: "js weekly articles", path: "/posts/js-weekly-articles" },
        ].map((city, index) => (
          <a
            key={city.title}
            className="scroll-items cursor-pointer"
            href={city.path}
            target="_blank"
            ref={el => (itemsRef.current[index] = el)}
          >
            {city.title} <span>{city.title.slice(0, 3).toUpperCase()}</span>
            <input
              type="radio"
              name="items"
              checked={selectedIndex === index}
              readOnly
            />
          </a>
        ))}
      </section>
    </div>
  );
};

export default ScrollSelect;
