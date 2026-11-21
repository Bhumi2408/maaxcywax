"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { productTabs } from "./data";

const AUTOPLAY_DELAY = 5000;
const MAX_PER_VIEW = 4;

function ProductCard({ item, hidden }) {
  const names = Array.isArray(item.name) ? item.name : [item.name];
  return (
    <div className="pc-item" aria-hidden={hidden || undefined}>
      <div className="pc-image">
        <Image
          src={item.image}
          alt={item.alt || names.join(" ")}
          width={item.width || 1024}
          height={item.height || 1024}
          sizes="(min-width: 999px) 25vw, (min-width: 689px) 50vw, 100vw"
        />
      </div>
      <div className="pc-content">
        <div>
          <div className="pc-title-price">
            <h3 className="pc-title">
              {names.map((part, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {part}
                </Fragment>
              ))}
            </h3>
            <div className="pc-price">{item.price}</div>
          </div>
          <div className="pc-text">
            <p>
              {item.size && (
                <>
                  {item.bold ? <strong>{item.size}</strong> : item.size}
                  <br />
                </>
              )}
              {item.text}
            </p>
          </div>
        </div>
        <div className="pc-meta"></div>
      </div>
    </div>
  );
}

function ProductCarousel({ items }) {
  const n = items.length;
  // Repeat the slides so a full view can always be filled while looping.
  const repeats = Math.ceil((n + MAX_PER_VIEW) / n);
  const slides = Array.from({ length: repeats }, () => items).flat();

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const timer = useRef(null);
  const dragStart = useRef(null);

  const enableAnimationNextFrame = (after) =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimate(true);
        after?.();
      })
    );

  const go = useCallback(
    (next) => {
      if (next < 0) {
        setAnimate(false);
        setIndex(n);
        enableAnimationNextFrame(() => setIndex(n - 1));
      } else {
        setAnimate(true);
        setIndex(next);
      }
    },
    [n]
  );

  const restartAutoplay = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, AUTOPLAY_DELAY);
  }, []);

  useEffect(() => {
    restartAutoplay();
    return () => clearInterval(timer.current);
  }, [restartAutoplay]);

  const onTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || index < n) return;
    setAnimate(false);
    setIndex(index - n);
    enableAnimationNextFrame();
  };

  const onPointerDown = (e) => {
    dragStart.current = e.clientX;
  };

  const onPointerUp = (e) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) < 40) return;
    go(dx < 0 ? index + 1 : index - 1);
    restartAutoplay();
  };

  return (
    <div className="pc">
      <div
        className="pc-viewport"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={() => (dragStart.current = null)}
      >
        <div
          className="pc-track"
          style={{ "--i": index, transition: animate ? undefined : "none" }}
          onTransitionEnd={onTransitionEnd}
        >
          {slides.map((item, i) => (
            <ProductCard key={i} item={item} hidden={i >= n} />
          ))}
        </div>
      </div>
      <div className="pc-dots">
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            className={`pc-dot${index % n === i ? " is-active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              go(i);
              restartAutoplay();
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProductTabs() {
  const [active, setActive] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs-heading" role="tablist">
        {productTabs.map((tab, i) => (
          <button
            key={tab.title}
            id={`tab-title-${i}`}
            type="button"
            role="tab"
            className="tab-title"
            aria-selected={active === i}
            aria-controls={`tab-panel-${i}`}
            style={{ "--tab-order": i }}
            onClick={() => setActive(i)}
          >
            <span className="tab-title-text">{tab.title}</span>
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {productTabs.map((tab, i) => (
          <div
            key={tab.title}
            id={`tab-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`tab-title-${i}`}
            className={`tab-panel${active === i ? " is-active" : ""}`}
            style={{ "--tab-order": i }}
          >
            {active === i && <ProductCarousel items={tab.items} />}
          </div>
        ))}
      </div>
    </div>
  );
}
