import "./index.scss"
import type p5 from "p5";
import { useEffect, useRef, memo, useState } from "react";
import {
    EnterFullScreenIcon,
    ExitFullScreenIcon,
    PlayIcon,
    StopIcon,
    ResumeIcon,
    ReloadIcon,
    ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { DownloadIcon } from "lucide-react";

type Sketch = (p: p5) => void;

const defaultSketch: Sketch = (p: p5) => {
    let xoff = 0.0;
    p.setup = () => {
        p.createCanvas(100, 100);
        p.frameRate(60);
    };
    p.draw = () => {
        let noise = p.noise(xoff) * (p.width - 50);
        p.background(255);
        p.noStroke();
        p.fill(34, 39, 54);
        xoff += 0.01;
        p.ellipse(noise, p.height / 2, 25, 25);
    };
};

interface Props {
    sketch: Sketch;
    showControls?: boolean; // defaults to false
}

const Button = ({
    onClick,
    children,
}: {
    onClick: () => void;
    children: React.ReactNode;
}) => (
    <button
        type="button"
        onClick={onClick}
        className="inline-block text-skin-inverted rounded bg-skin-inverted px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
    >
        {children}
    </button>
);
let doOnce = false;

const P5Canvas = memo(({ sketch, showControls = false }: Props) => {
    const container = useRef<HTMLDivElement>(null);
    const trueContainer = useRef<HTMLDivElement>(null);
    let [p, setP] = useState<p5>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const start = async () => {
        if (container.current) {
            const p5 = await import("p5");
            !p && setP(new p5.default(sketch || defaultSketch, container.current));
        }
    };
    const remove = () => {
        p && p.remove();
        p && setP(null);
    };
    const stop = () => p && p.isLooping() && p.noLoop();
    const begin = () => p && !p.isLooping() && p.loop();
    const init = async () => {
        setLoading(true);
        remove();
        await start();
        setLoading(false);
    };
    const [loading, setLoading] = useState(false);

    const clear = () => {
        remove();
        container.current && (container.current.innerHTML = "");
    };

    const toggleFullscreen = async () => {
        if (trueContainer.current && !isFullscreen) {
            if (trueContainer.current.requestFullscreen) {
                await trueContainer.current.requestFullscreen();
                trueContainer.current.style.backgroundColor = "black";
            }
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            }
            trueContainer.current.style.backgroundColor = "";
            setIsFullscreen(false);
        }
    };

    const download = () => {
        if (!p) return;
        p.saveGif("sketch", 5, { delay: 1 });
    };

    useEffect(() => {
        if (p && isFullscreen) {
            p.resizeCanvas(window.innerWidth, window.innerHeight - 90);
            p.windowResized = async () => {
                await init();
                p.resizeCanvas(window.innerWidth, window.innerHeight - 90);
                container.current.style.minHeight = p?.height + "px";
            };
        }

        const obs = new IntersectionObserver(async ([entry]) => {
            if (entry.isIntersecting) {
                !doOnce && !container.current.innerHTML && (await init());
                !doOnce && !showControls && begin(); //没有按钮自动启动
                if (!doOnce && !container.current.innerHTML) doOnce = true;
            } else stop();
        });
        obs.observe(trueContainer.current);
        return () => {
            obs.disconnect();
            remove();
        };
    }, [isFullscreen, p]);

    const handleFullscreenChange = () => {
        setLoading(true);
        setIsFullscreen(!!document.fullscreenElement);
    };

    useEffect(() => {
        (async () => {
            if (!container.current) return;
            container.current.innerHTML = "";
            await init();
        })();
        return () => {
            if (!container.current) return;
            remove();
            container.current.innerHTML = "";
        };
    }, [sketch]);

    useEffect(() => {
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        container.current.style.minHeight = p?.height + "px";
        trueContainer.current.style.backgroundColor = "";
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            remove();
        };
    }, [p]);

    return (
        <>
            <div ref={trueContainer} className="p5_container mt-4 relative">
                <div
                    ref={container}
                    className="flex w-full max-w-full justify-center"
                ></div>
                {loading && (
                    <div className="min-h-[200px] flex justify-center items-center text-2xl">
                        加载中...
                    </div>
                )}
                {!loading && showControls && (
                    <div
                        className={
                            "flex pt-4 select-none justify-around" +
                            (isFullscreen ? " fixed mb-10 pb-4 left-0 w-full" : "")
                        }
                    >
                        <Button onClick={stop}>
                            <StopIcon />
                        </Button>
                        <Button onClick={begin}>
                            <PlayIcon />
                        </Button>
                        <Button onClick={download}>
                            <DownloadIcon></DownloadIcon>
                        </Button>

                        {/* <Button onClick={init}>
                            <ResumeIcon></ResumeIcon>
                        </Button> */}

                        <Button onClick={clear}>
                            <ReloadIcon></ReloadIcon>
                        </Button>
                        <Button onClick={toggleFullscreen}>
                            {isFullscreen ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
});

export default P5Canvas;
