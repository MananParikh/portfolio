"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Tube, RoundedBox, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { archNodes, archEdges, type ArchNode } from "@/data/resume";
import { SectionHeader } from "./selected-work";
import { SectionProgress } from "./section-progress";
import { Asterisk } from "./icons";

/**
 * 3D Architecture Diagram — Three.js scene.
 *
 * - 7 nodes float in 3D space, each a RoundedBox with the node label as Html overlay
 * - Nodes have subtle parallax drift
 * - On scroll, the whole scene rotates slightly (parallax)
 * - Click a node → camera eases toward it, side inspector updates
 * - Edges are glowing tubes connecting nodes
 * - Paper-aesthetic: low-opacity, warm palette, no neon
 */

const kindColors: Record<ArchNode["kind"], string> = {
  client: "#8a8275",      // faded
  frontend: "#14110d",    // ink
  service: "#4c5a3a",     // moss
  leader: "#d24a1c",      // rust
  replica: "#c8b89e",     // clay
  cache: "#4c5a3a",       // moss
  store: "#8a8275",       // faded
};

const kindEmissive: Record<ArchNode["kind"], string> = {
  client: "#000000",
  frontend: "#0a0907",
  service: "#1a2014",
  leader: "#3a1408",
  replica: "#2a2418",
  cache: "#1a2014",
  store: "#000000",
};

// Convert 2D percentage coords to 3D space
function to3D(x: number, y: number, z: number = 0): [number, number, number] {
  // x: 0-100 → -4.5 to 4.5
  // y: 0-100 → 3 to -3 (inverted, because 3D y is up)
  // z: varied per node for depth
  return [
    (x - 50) / 50 * 4.5,
    -(y - 50) / 50 * 3,
    z,
  ];
}

// Assign Z depth per node kind for visual layering
const nodeZ: Record<ArchNode["kind"], number> = {
  client: 0.5,
  frontend: 0,
  service: -0.5,
  leader: -1,
  replica: -1.5,
  cache: 0.8,
  store: -0.3,
};

type SceneProps = {
  selected: string;
  onSelect: (id: string) => void;
  hovered: string | null;
  onHover: (id: string | null) => void;
};

function Scene({ selected, onSelect, hovered, onHover }: SceneProps) {
  const groupRef = React.useRef<THREE.Group>(null);
  const { camera, mouse } = useThree();
  const targetRef = React.useRef<THREE.Vector3 | null>(null);
  const lookRef = React.useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Camera ease toward selected node
  React.useEffect(() => {
    if (!selected) {
      targetRef.current = null;
      return;
    }
    const node = archNodes.find((n) => n.id === selected);
    if (!node) return;
    const [x, y, z] = to3D(node.x, node.y, nodeZ[node.kind]);
    // Camera positions slightly offset from the node
    targetRef.current = new THREE.Vector3(x * 0.8, y * 0.8, z + 4.5);
    lookRef.current = new THREE.Vector3(x, y, z);
  }, [selected]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Subtle group rotation based on mouse position (parallax)
    const targetRotY = mouse.x * 0.15;
    const targetRotX = -mouse.y * 0.1;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04;

    // Subtle floating drift
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.3) * 0.05;

    // Camera ease
    if (targetRef.current) {
      camera.position.lerp(targetRef.current, 0.04);
      camera.lookAt(lookRef.current);
    } else {
      // Default camera position
      const defaultPos = new THREE.Vector3(0, 0, 14);
      camera.position.lerp(defaultPos, 0.03);
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Edges (glowing tubes) */}
      {archEdges.map((edge, i) => {
        const from = archNodes.find((n) => n.id === edge.from)!;
        const to = archNodes.find((n) => n.id === edge.to)!;
        const fromPos = to3D(from.x, from.y, nodeZ[from.kind]);
        const toPos = to3D(to.x, to.y, nodeZ[to.kind]);

        // Create a curve between the two points
        const start = new THREE.Vector3(...fromPos);
        const end = new THREE.Vector3(...toPos);
        const mid = start.clone().lerp(end, 0.5);
        mid.z += 0.3; // slight arc
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);

        const isActive =
          hovered === edge.from ||
          hovered === edge.to ||
          selected === edge.from ||
          selected === edge.to;

        return (
          <group key={i}>
            <Tube
              args={[curve, 32, 0.025, 8, false]}
            >
              <meshBasicMaterial
                color={isActive ? "#d24a1c" : "#14110d"}
                transparent
                opacity={isActive ? 0.85 : 0.2}
              />
            </Tube>
            {/* Glow layer (thicker, more transparent) */}
            {isActive && (
              <Tube
                args={[curve, 32, 0.06, 8, false]}
              >
                <meshBasicMaterial
                  color="#d24a1c"
                  transparent
                  opacity={0.15}
                />
              </Tube>
            )}
          </group>
        );
      })}

      {/* Nodes */}
      {archNodes.map((node) => {
        const pos = to3D(node.x, node.y, nodeZ[node.kind]);
        const isSelected = selected === node.id;
        const isHovered = hovered === node.id;
        const color = kindColors[node.kind];
        const emissive = kindEmissive[node.kind];

        return (
          <Node3D
            key={node.id}
            node={node}
            position={pos}
            color={color}
            emissive={emissive}
            isSelected={isSelected}
            isHovered={isHovered}
            onSelect={onSelect}
            onHover={onHover}
          />
        );
      })}
    </group>
  );
}

function Node3D({
  node,
  position,
  color,
  emissive,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: {
  node: ArchNode;
  position: [number, number, number];
  color: string;
  emissive: string;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  const ref = React.useRef<THREE.Mesh>(null);
  const basePos = React.useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!ref.current) return;
    // Gentle floating per-node
    const t = state.clock.elapsedTime;
    const offset = (node.x + node.y) * 0.01;
    ref.current.position.y = basePos.y + Math.sin(t * 0.4 + offset) * 0.04;
    ref.current.position.x = basePos.x + Math.cos(t * 0.3 + offset) * 0.02;

    // Scale on hover/select
    const targetScale = isSelected ? 1.25 : isHovered ? 1.12 : 1;
    ref.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.15
    );
  });

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "auto";
        }}
      >
        <RoundedBox args={[1.4, 0.7, 0.25]} radius={0.06} smoothness={4}>
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={isSelected ? 0.6 : 0.2}
            roughness={0.7}
            metalness={0.1}
          />
        </RoundedBox>
      </mesh>

      {/* Label overlay */}
      <Html
        position={[0, 0, 0.15]}
        center
        distanceFactor={10}
        occlude={false}
      >
        <div
          style={{
            color: ["frontend", "leader", "cache"].includes(node.kind) ? "#f1ece1" : "#14110d",
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontSize: "13px",
            fontWeight: 400,
            textAlign: "center",
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            transform: "translateY(-6px)",
          }}
        >
          {node.label}
        </div>
        {node.metric && (
          <div
            style={{
              color: ["frontend", "leader", "cache"].includes(node.kind) ? "#f1ece1" : "#14110d",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              opacity: 0.65,
              marginTop: "2px",
              pointerEvents: "none",
            }}
          >
            {node.metric}
          </div>
        )}
      </Html>

      {/* Selection ring */}
      {isSelected && (
        <mesh position={[0, 0, -0.15]}>
          <ringGeometry args={[0.9, 1.0, 32]} />
          <meshBasicMaterial color="#d24a1c" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

// (ResetCamera handled in React overlay above)

export function ArchitectureDiagram3D() {
  const [selected, setSelected] = React.useState<string>("frontend");
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [webglFailed, setWebglFailed] = React.useState(false);

  const selectedNode = archNodes.find((n) => n.id === selected) || archNodes[0];

  return (
    <section id="architecture" className="relative px-5 pt-24 md:px-8 md:pt-36">
      <SectionProgress />
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader num="03" title="Architecture" kicker="Stock Bazaar · 3D · Interactive" />

        <div className="mt-10 grid grid-cols-12 gap-6 md:mt-14">
          {/* 3D Canvas */}
          <div className="col-span-12 md:col-span-8">
            <div className="relative border border-ink bg-paper-2/30 p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="label text-faded">System topology · 3D · click any node</div>
                <div className="flex items-center gap-3">
                  {selected !== "frontend" && (
                    <button
                      type="button"
                      onClick={() => setSelected("frontend")}
                      data-cursor="link"
                      data-cursor-label="Reset"
                      className="font-mono text-[9px] uppercase tracking-[0.16em] text-rust hover:underline"
                    >
                      ← Reset view
                    </button>
                  )}
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-faded">
                    7 nodes · 8 edges
                  </div>
                </div>
              </div>

              {/* 3D scene container */}
              <div
                className="relative h-[500px] md:h-[600px] overflow-hidden"
                style={{ background: "linear-gradient(180deg, var(--paper) 0%, var(--paper-2) 100%)" }}
              >
                {!webglFailed && (
                  <Canvas
                    camera={{ position: [0, 0, 14], fov: 55 }}
                    onCreated={({ gl }) => {
                      // Check if WebGL actually works
                      if (!gl.getContext()) {
                        setWebglFailed(true);
                      }
                    }}
                    onError={() => setWebglFailed(true)}
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                  >
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[5, 5, 5]} intensity={0.6} />
                    <directionalLight position={[-5, -3, 2]} intensity={0.3} color="#d24a1c" />
                    <Scene
                      selected={selected}
                      onSelect={setSelected}
                      hovered={hovered}
                      onHover={setHovered}
                    />
                    <OrbitControls
                      enablePan={false}
                      enableZoom={false}
                      minPolarAngle={Math.PI / 3}
                      maxPolarAngle={Math.PI / 1.8}
                      minAzimuthAngle={-Math.PI / 6}
                      maxAzimuthAngle={Math.PI / 6}
                      rotateSpeed={0.4}
                      makeDefault
                    />
                  </Canvas>
                )}

                {webglFailed && (
                  <div className="flex h-full items-center justify-center text-center">
                    <div>
                      <div className="label text-faded mb-2">WebGL unavailable</div>
                      <p className="text-sm text-ink/60 max-w-xs">
                        3D rendering isn&apos;t available in this browser. The interactive
                        diagram requires WebGL support.
                      </p>
                    </div>
                  </div>
                )}

                {/* Subtle vignette overlay */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 50%, var(--paper) 140%)",
                  }}
                />
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-ink/15 pt-3">
                {([
                  ["leader", "Leader"],
                  ["replica", "Replica"],
                  ["cache", "Cache"],
                  ["frontend", "Gateway"],
                  ["service", "Service"],
                  ["client", "Client"],
                ] as const).map(([kind, label]) => (
                  <div key={kind} className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-2.5 w-2.5"
                      style={{
                        background: kindColors[kind],
                        border: `1px solid var(--ink)`,
                      }}
                    />
                    <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-faded">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side panel — node detail */}
          <div className="col-span-12 md:col-span-4">
            <div className="sticky top-24 border border-ink bg-paper p-5">
              <div className="flex items-center gap-2">
                <Asterisk size={14} className="text-rust" />
                <div className="label text-faded">Inspector</div>
              </div>

              <h3 className="mt-4 font-serif text-2xl leading-tight tracking-tight text-ink">
                {selectedNode.label}
              </h3>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-faded">
                {selectedNode.role}
              </div>

              {selectedNode.metric && (
                <div className="mt-4 inline-block border border-rust bg-rust/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-rust">
                  {selectedNode.metric}
                </div>
              )}

              <p className="mt-4 text-sm leading-relaxed text-ink/80 text-pretty">
                {selectedNode.detail}
              </p>

              <div className="mt-5">
                <div className="label text-faded">Tech</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedNode.tech.map((t) => (
                    <span
                      key={t}
                      className="border border-ink/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-ink/15 pt-3">
                <div className="label text-faded">Connections</div>
                <ul className="mt-2 space-y-1.5">
                  {archEdges
                    .filter((e) => e.from === selectedNode.id || e.to === selectedNode.id)
                    .map((e) => {
                      const other = e.from === selectedNode.id ? e.to : e.from;
                      const otherNode = archNodes.find((n) => n.id === other)!;
                      return (
                        <li
                          key={`${e.from}-${e.to}`}
                          className="flex items-baseline justify-between gap-2 text-[12px]"
                        >
                          <span className="font-mono text-faded uppercase tracking-[0.08em]">
                            {e.label}
                          </span>
                          <span className="font-serif italic text-ink/80">
                            {otherNode.label}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>

              <p className="mt-5 border-t border-ink/15 pt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-faded">
                Click any node in the 3D scene to inspect it · drag to rotate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
