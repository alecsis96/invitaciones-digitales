"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SherHome.module.css";

type Point = { x: number; y: number };

type ConnectorLayout = {
  width: number;
  height: number;
  points: Point[];
  mobile: boolean;
};

function layoutsMatch(current: ConnectorLayout | null, next: ConnectorLayout) {
  if (!current || current.mobile !== next.mobile || current.points.length !== next.points.length) return false;

  if (Math.abs(current.width - next.width) > .5 || Math.abs(current.height - next.height) > .5) return false;

  return current.points.every((point, index) => (
    Math.abs(point.x - next.points[index].x) <= .5
    && Math.abs(point.y - next.points[index].y) <= .5
  ));
}


function mobilePath(points: Point[], width: number) {
  if (points.length === 0) return "";

  const tension = 0.55;

  return points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }

    const previous = points[index - 1];
    const dy = point.y - previous.y;

    // Control vertical amplio para crear una S descendente.
    const handle = Math.min(150, Math.max(55, dy * tension));

    return `${path}
      C ${previous.x} ${previous.y + handle},
        ${point.x} ${point.y - handle},
        ${point.x} ${point.y}`;
  }, "");
}


function desktopPath(points: Point[], width: number) {
  return points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;

    const previous = points[index - 1];
    const distance = point.x - previous.x;
    const amplitude = Math.min(18, width * .018);
    const direction = index % 2 === 0 ? -1 : 1;

    return `${path} C ${previous.x + distance * .3} ${previous.y + amplitude * direction}, ${point.x - distance * .3} ${point.y - amplitude * direction}, ${point.x} ${point.y}`;
  }, "");
}

function clampProgress(progress: number) {
  return Math.min(1, Math.max(0, progress));
}

export function SherProcessConnector({ markerIds }: { markerIds: readonly string[] }) {
  const [layout, setLayout] = useState<ConnectorLayout | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const host = document.getElementById("sher-process-steps");
    if (!host) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const hostRect = host.getBoundingClientRect();
      const markers = markerIds.map((id) => document.getElementById(id)?.getBoundingClientRect());
      const points: Point[] = [];

      for (const marker of markers) {
        if (!marker) return;
        points.push({
          x: marker.left - hostRect.left + marker.width / 2,
          y: marker.top - hostRect.top + marker.height / 2,
        });
      }

      if (points.length !== markerIds.length || !hostRect.width || !hostRect.height) return;

      const next = {
        width: hostRect.width,
        height: hostRect.height,
        points,
        mobile: window.matchMedia("(max-width: 699px)").matches,
      };

      setLayout((current) => (layoutsMatch(current, next) ? current : next));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(host);
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule).catch(() => undefined);
    schedule();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [markerIds]);

  const path = layout
    ? layout.mobile
      ? mobilePath(layout.points, layout.width)
      : desktopPath(layout.points, layout.width)
    : "";

  useEffect(() => {
    const host = document.getElementById("sher-process-steps");
    const pathElement = pathRef.current;
    const indicator = progressRef.current;

    if (!layout || !host || !pathElement || !indicator) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pathLength = pathElement.getTotalLength();
    let frame = 0;

    const update = () => {
      frame = 0;

      if (reducedMotion.matches) {
        indicator.setAttribute("visibility", "hidden");
        return;
      }

      const markers = markerIds.map((id) => document.getElementById(id)?.getBoundingClientRect());
      if (markers.some((marker) => !marker)) {
        indicator.setAttribute("visibility", "hidden");
        return;
      }

      const markerCenters = markers.map((marker) => marker!.top + marker!.height / 2);
      const viewportHeight = window.innerHeight;
      const progress = layout.mobile
        ? (viewportHeight * .7 - markerCenters[0])
          / (markerCenters[markerCenters.length - 1] - markerCenters[0] + viewportHeight * .4)
        : (viewportHeight * .72 - host.getBoundingClientRect().top)
          / (host.getBoundingClientRect().height + viewportHeight * .36);
      const point = pathElement.getPointAtLength(clampProgress(progress) * pathLength);

      indicator.setAttribute("transform", `translate(${point.x} ${point.y})`);
      indicator.setAttribute("visibility", "visible");
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    schedule();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [layout, markerIds, path]);

  if (!layout) return null;

  return (
    <svg
      className={styles.processConnector}
      aria-hidden="true"
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      preserveAspectRatio="none"
    >
      <path ref={pathRef} d={path} />
      <g ref={progressRef} className={styles.processProgress} visibility="hidden">
        <circle r="3.5" />
      </g>
    </svg>
  );
}
