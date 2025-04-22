import { useState, useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import "./HoverLink.css";

const HoverLink = ({ href, content, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const linkRef = useRef(null);
  const hoverContentRef = useRef(null);

  const updatePosition = useCallback(e => {
    if (!hoverContentRef.current || !linkRef.current) return;

    const linkRect = linkRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    const hoverHeight = hoverContentRef.current.offsetHeight;
    const hoverWidth = hoverContentRef.current.offsetWidth;
    const linkHeight = linkRect.height;

    let topPosition;
    if (clientY + hoverHeight + linkHeight <= window.innerHeight) {
      topPosition = clientY + linkHeight;
    } else {
      topPosition = clientY - hoverHeight - linkHeight;
    }

    const leftPosition = clientX - hoverWidth / 2;
    console.log("leftPosition", leftPosition);

    setPosition({ left: leftPosition + 100, top: topPosition });
  }, []);

  const handleMouseOver = useCallback(
    e => {
      setIsHovered(true);
      requestAnimationFrame(() => updatePosition(e));
    },
    [updatePosition]
  );

  const handleMouseMove = useCallback(
    e => {
      if (isHovered) updatePosition(e);
    },
    [isHovered, updatePosition]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsHovered(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href={href}
      ref={linkRef}
      onMouseOver={handleMouseOver}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {ReactDOM.createPortal(
        isHovered && (
          <div
            ref={hoverContentRef}
            style={{
              position: "fixed",
              left: position.left,
              top: position.top,
              opacity: 1,
              transform: "scale(1)",
              transition: "opacity 0.3s, transform 0.3s",
              padding: "10px",
              boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
              backgroundColor: "transparent",
              width: "240px",
              pointerEvents: "none",
            }}
          >
            {content}
          </div>
        ),
        document.body
      )}
    </a>
  );
};

interface HoverLinkContainerProps {
  url: string;
  img?: string;
  content: string;
  text: string;
}

export default ({ url, img, content, text }: HoverLinkContainerProps) => {
  return (
    <HoverLink
      href={url}
      content={
        <div className="hover-content">
          {img && <img src={img} alt="预览" />}
          <p>{content}</p>
        </div>
      }
    >
      {text}
    </HoverLink>
  );
};
