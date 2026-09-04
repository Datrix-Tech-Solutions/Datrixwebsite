"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface SlickResponsive {
  breakpoint: number;
  settings: Partial<SlickSettings>;
}

export interface SlickSettings {
  slidesToShow: number;
  centerMode: boolean;
  centerPadding: number;
  dots: boolean;
  arrows: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
  infinite: boolean;
  speed: number;
}

interface SlickSliderProps {
  className?: string;
  settings: Partial<SlickSettings>;
  responsive?: SlickResponsive[];
  children: React.ReactNode[];
}

const DEFAULTS: SlickSettings = {
  slidesToShow: 1,
  centerMode: false,
  centerPadding: 50,
  dots: false,
  arrows: true,
  autoplay: false,
  autoplaySpeed: 3000,
  infinite: true,
  speed: 500,
};

/**
 * React re-implementation of the slick-carousel behaviors used by the
 * original Factura site (center mode, dots, arrows, autoplay, infinite
 * cloning, drag/swipe and responsive breakpoints). Renders the exact
 * same DOM structure/classes as slick so the original stylesheet applies
 * without modification.
 */
export default function SlickSlider({
  className = "",
  settings,
  responsive = [],
  children,
}: SlickSliderProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [listWidth, setListWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1440);

  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [animate, setAnimate] = useState(true);
  const dragState = useRef<{ startX: number } | null>(null);
  const jumpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = React.Children.count(children);

  // resolve responsive settings: smallest breakpoint >= window width wins
  const resolved = useMemo(() => {
    const match = responsive
      .filter((r) => windowWidth <= r.breakpoint)
      .sort((a, b) => a.breakpoint - b.breakpoint)[0];
    return { ...DEFAULTS, ...settings, ...(match ? match.settings : {}) };
  }, [responsive, settings, windowWidth]);

  const {
    slidesToShow,
    centerMode,
    centerPadding,
    dots,
    arrows,
    autoplay,
    autoplaySpeed,
    infinite,
    speed,
  } = resolved;

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(window.innerWidth);
      if (listRef.current) setListWidth(listRef.current.clientWidth);
    };
    onResize();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(() => {
      if (listRef.current) setListWidth(listRef.current.clientWidth);
    });
    if (listRef.current) ro.observe(listRef.current);
    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  // measurement
  const cp = centerMode ? centerPadding : 0;
  const innerWidth = Math.max(listWidth - 2 * cp, 0);
  const slideWidth = slidesToShow > 0 ? innerWidth / slidesToShow : innerWidth;
  const cloneCount = infinite ? slidesToShow + 1 : 0;

  const safeIndex = total > 0 ? ((current % total) + total) % total : 0;

  const goTo = useCallback(
    (idx: number) => {
      if (total === 0) return;
      if (jumpTimer.current) clearTimeout(jumpTimer.current);
      setAnimate(true);
      setCurrent(idx);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // infinite wrap handling: after animating past the ends, jump silently
  useEffect(() => {
    if (!infinite || total === 0) return;
    if (current >= total || current < 0) {
      if (jumpTimer.current) clearTimeout(jumpTimer.current);
      jumpTimer.current = setTimeout(() => {
        setAnimate(false);
        setCurrent(((current % total) + total) % total);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setAnimate(true))
        );
      }, speed);
    }
    return () => {
      if (jumpTimer.current) clearTimeout(jumpTimer.current);
    };
  }, [current, infinite, total, speed]);

  // autoplay
  useEffect(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    if (autoplay && total > 0 && !dragging) {
      autoTimer.current = setInterval(() => {
        setCurrent((c) => c + 1);
      }, autoplaySpeed);
    }
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [autoplay, autoplaySpeed, total, dragging]);

  // drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    if (total <= 1) return;
    dragState.current = { startX: e.clientX };
    setDragging(true);
    setAnimate(false);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current) return;
    setDragOffset(e.clientX - dragState.current.startX);
  };
  const endDrag = (e: React.PointerEvent) => {
    if (!dragState.current) return;
    const offset = e.clientX - dragState.current.startX;
    dragState.current = null;
    setDragging(false);
    setDragOffset(0);
    setAnimate(true);
    if (Math.abs(offset) > (slideWidth || 100) / 3) {
      if (offset < 0) next();
      else prev();
    }
  };

  // track transform
  const centerAlign = centerMode ? cp + (innerWidth - slideWidth) / 2 : 0;
  const baseX = centerAlign - (current + cloneCount) * slideWidth;
  const trackX = baseX + dragOffset;

  const slides = React.Children.toArray(children);
  const renderSlides: React.ReactNode[] = [];
  // clones before
  if (infinite) {
    for (let i = total - cloneCount; i < total; i++) {
      renderSlides.push(
        <div
          key={`pre-${i}`}
          className="slick-slide slick-cloned"
          style={{ width: `${slideWidth}px` }}
          aria-hidden="true"
        >
          {slides[(i + total) % total]}
        </div>
      );
    }
  }
  slides.forEach((child, i) => {
    const isCenter = i === safeIndex;
    const isActive =
      centerMode
        ? i >= safeIndex - Math.floor(slidesToShow / 2) &&
          i <= safeIndex + Math.floor(slidesToShow / 2)
        : i >= safeIndex && i < safeIndex + slidesToShow;
    const cls = ["slick-slide"];
    if (isActive) cls.push("slick-active");
    if (isCenter && centerMode) cls.push("slick-center");
    if (isCenter) cls.push("slick-current");
    renderSlides.push(
      <div
        key={`slide-${i}`}
        className={cls.join(" ")}
        style={{ width: `${slideWidth}px`, outline: "none" }}
        aria-hidden={isCenter ? undefined : "true"}
      >
        {child}
      </div>
    );
  });
  // clones after
  if (infinite) {
    for (let i = 0; i < cloneCount; i++) {
      renderSlides.push(
        <div
          key={`post-${i}`}
          className="slick-slide slick-cloned"
          style={{ width: `${slideWidth}px` }}
          aria-hidden="true"
        >
          {slides[i % total]}
        </div>
      );
    }
  }

  const rootCls = ["slick-initialized", "slick-slider"];
  if (dots) rootCls.push("slick-dotted");
  if (className) rootCls.push(className);

  return (
    <div className={rootCls.join(" ")}>
      {arrows && total > 1 ? (
        <button
          type="button"
          data-role="none"
          className="slick-prev slick-arrow"
          aria-label="Previous"
          role="button"
          onClick={prev}
        >
          Previous
        </button>
      ) : null}
      <div
        ref={listRef}
        className={`slick-list${total > 1 ? " draggable" : ""}`}
        style={centerMode ? { padding: `0px ${centerPadding}px` } : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <div
          className="slick-track"
          style={{
            transform: `translate3d(${trackX}px, 0px, 0px)`,
            transition:
              animate && !dragging ? `transform ${speed}ms ease` : "none",
            width: `${(total + cloneCount * 2) * (slideWidth || 0)}px`,
          }}
        >
          {renderSlides}
        </div>
      </div>
      {dots && total > 1 ? (
        <ul className="slick-dots" style={{ display: "block" }}>
          {slides.map((_, i) => (
            <li
              key={i}
              className={i === safeIndex ? "slick-active" : undefined}
              aria-hidden={i === safeIndex ? undefined : "true"}
            >
              <button
                type="button"
                data-role="none"
                role="button"
                onClick={() => goTo(i)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {arrows && total > 1 ? (
        <button
          type="button"
          data-role="none"
          className="slick-next slick-arrow"
          aria-label="Next"
          role="button"
          onClick={next}
        >
          Next
        </button>
      ) : null}
    </div>
  );
}
