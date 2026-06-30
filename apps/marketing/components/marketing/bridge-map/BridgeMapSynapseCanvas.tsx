"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";
import {
  SYNAPSE_IMG_H,
  SYNAPSE_IMG_W,
  SYNAPSE_PALETTE,
  SYNAPSE_PTS,
} from "./synapse-points";

type Node = {
  x: number;
  y: number;
  r: number;
  col: readonly [number, number, number];
  a: number;
  ph: number;
  sp: number;
  px: number;
  py: number;
};

function buildEdges(nodes: Node[]): Array<[number, number]> {
  const seen = new Set<string>();
  const edges: Array<[number, number]> = [];
  const n = nodes.length;

  for (let i = 0; i < n; i++) {
    const distances: Array<[number, number]> = [];
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      distances.push([dx * dx + dy * dy, j]);
    }
    distances.sort((a, b) => a[0] - b[0]);

    for (let m = 0; m < 2; m++) {
      const dist = distances[m][0];
      const j = distances[m][1];
      if (dist > 0.012) continue;
      const a = Math.min(i, j);
      const b = Math.max(i, j);
      const key = `${a}-${b}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([a, b]);
      }
    }
  }

  return edges;
}

type BridgeMapSynapseCanvasProps = {
  containerRef: RefObject<HTMLElement | null>;
  /** Match hero background object-position on desktop */
  imageAlign?: "center" | "right";
};

export function BridgeMapSynapseCanvas({
  containerRef,
  imageAlign = "right",
}: BridgeMapSynapseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = Boolean(reduceMotion);

    const nodes: Node[] = SYNAPSE_PTS.map((p) => ({
      x: p[0],
      y: p[1],
      r: p[3],
      col: SYNAPSE_PALETTE[p[2]],
      a: 0,
      ph: Math.random() * Math.PI * 2,
      sp: 0.3 + Math.random() * 0.5,
      px: 0,
      py: 0,
    }));

    const edges = buildEdges(nodes);

    let width = 0;
    let height = 0;
    let dpr = 1;

    const remap = () => {
      const scale = Math.max(width / SYNAPSE_IMG_W, height / SYNAPSE_IMG_H);
      const drawW = SYNAPSE_IMG_W * scale;
      const drawH = SYNAPSE_IMG_H * scale;
      const offX =
        imageAlign === "right" ? width - drawW : (width - drawW) / 2;
      const offY = (height - drawH) / 2;

      for (const node of nodes) {
        node.px = offX + node.x * drawW;
        node.py = offY + node.y * drawH;
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      remap();
    };

    const mouse = { x: -1, y: -1, on: false };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.on = true;
    };

    const onPointerLeave = () => {
      mouse.on = false;
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    const glowRadius = 190;
    let time = 0;
    let frame = 0;

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        let target = 0;
        if (mouse.on) {
          const dx = node.px - mouse.x;
          const dy = node.py - mouse.y;
          const dist = Math.hypot(dx, dy);
          target = Math.max(0, 1 - dist / glowRadius);
          target *= target;
        }
        node.a += (target - node.a) * (reduce ? 1 : 0.06);
      }

      for (const [a, b] of edges) {
        const na = nodes[a];
        const nb = nodes[b];
        ctx.strokeStyle = "rgba(190,194,169,0.045)";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(na.px, na.py);
        ctx.lineTo(nb.px, nb.py);
        ctx.stroke();
      }

      for (const node of nodes) {
        const breathe = reduce
          ? 0
          : 0.5 + 0.5 * Math.sin(time * node.sp + node.ph);
        const alpha = 0.06 + breathe * 0.03 + node.a * 0.92;
        const radius = node.r + node.a * 2.2;

        if (node.a > 0.02) {
          ctx.save();
          ctx.shadowColor = `rgba(${node.col[0]},${node.col[1]},${node.col[2]},${0.95 * node.a})`;
          ctx.shadowBlur = 10 + node.a * 20;
          ctx.beginPath();
          ctx.arc(node.px, node.py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${node.col[0]},${node.col[1]},${node.col[2]},${alpha})`;
          ctx.fill();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(node.px, node.py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${node.col[0]},${node.col[1]},${node.col[2]},${alpha})`;
          ctx.fill();
        }
      }

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [containerRef, imageAlign, reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full md:block"
      aria-hidden
    />
  );
}
