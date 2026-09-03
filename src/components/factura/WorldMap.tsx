"use client";

import React, { useEffect, useRef } from "react";
import { MAP_MARKERS } from "./data";

interface AmChartInstance {
  clear?: () => void;
}

declare global {
  interface Window {
    AmCharts?: {
      makeChart: (id: string, config: unknown) => AmChartInstance;
      maps?: Record<string, unknown>;
      clear?: () => void;
    };
  }
}

const TARGET_SVG =
  "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`
    );
    if (existing) {
      if (existing.dataset.loaded === "true") resolve();
      else {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error(src)));
      }
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

export default function WorldMap() {
  const divRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<{ clear?: () => void } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const el = divRef.current;
    const init = async () => {
      try {
        await loadScript("/assets/js/amcharts/amcharts-bundle.js");
        await loadScript("/assets/js/amcharts/maps/js/world-low.js");
        if (cancelled || !window.AmCharts || !el) return;
        el.innerHTML = "";
        chartRef.current = window.AmCharts.makeChart("chartdiv", {
          type: "map",
          theme: "black",
          dataProvider: {
            map: "worldLow",
            images: MAP_MARKERS.map((m) => ({
              svgPath: TARGET_SVG,
              title: `<div class='customeMapToltip'><h3>${m.name}</h3><p>${m.email}</p></div>`,
              latitude: m.latitude,
              longitude: m.longitude,
            })),
          },
          areasSettings: {
            unlistedAreasColor: "#F7941D",
            outlineColor: "#F7941D",
            outlineThickness: "0",
          },
          imagesSettings: {
            color: "#21346B",
            rollOverColor: "#E07E0A",
            selectedColor: "#ffffff",
            pauseDuration: 2,
            animationDuration: 3,
            adjustAnimationSpeed: false,
          },
          balloon: {
            adjustBorderColor: true,
            borderThickness: 1,
            borderColor: "#ffffff",
            disableMouseEvents: false,
            color: "#ffffff",
            cornerRadius: 2,
            fillAlpha: 1,
            fillColor: "#21346B",
          },
        });
      } catch {
        /* map bundle unavailable - leave container empty */
      }
    };
    init();
    return () => {
      cancelled = true;
      try {
        chartRef.current?.clear?.();
      } catch {
        /* noop */
      }
      if (el) el.innerHTML = "";
    };
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `#chartdiv{display: block;width: 100%;height: 600px;}
.customeMapToltip{text-align: left;}
.customeMapToltip h3{color: #fff;margin-bottom:0;}
.customeMapToltip p{color: #fff;margin-bottom:0;}
.amcharts-chart-div > a{display: none !important;}
.amcharts-background{fill: #ffffff !important;}`,
        }}
      />
      <div ref={divRef} id="chartdiv" className="" />
    </>
  );
}
