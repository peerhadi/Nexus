"use client";

import { RefreshCw, Settings2, Workflow } from "lucide-react";
import { useEffect, useState } from "react";
import { initialConnections, integrations, type NodeId } from "./data";
import ConnectionMap from "./connection-map";
import SystemsPanel from "./systems-panel";

export default function Playground() {
  const [activeNodes, setActiveNodes] = useState<NodeId[]>([
    "website",
    "api",
    "database",
    "email",
  ]);
  const [connections, setConnections] =
    useState<[NodeId, NodeId][]>(initialConnections);
  const [selectedNode, setSelectedNode] = useState<NodeId | null>(null);
  const [running, setRunning] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const toggleNode = (id: NodeId) => {
    setActiveNodes((current) => {
      if (current.includes(id)) {
        setConnections((edges) =>
          edges.filter(([from, to]) => from !== id && to !== id),
        );
        if (selectedNode === id) setSelectedNode(null);
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  };

  const handleNodeClick = (id: NodeId) => {
    if (!activeNodes.includes(id)) {
      toggleNode(id);
      setSelectedNode(id);
      return;
    }

    if (!selectedNode) {
      setSelectedNode(id);
      return;
    }

    if (selectedNode === id) {
      setSelectedNode(null);
      return;
    }

    const alreadyConnected = connections.some(
      ([from, to]) =>
        (from === selectedNode && to === id) ||
        (from === id && to === selectedNode),
    );

    if (alreadyConnected) {
      setConnections((current) =>
        current.filter(
          ([from, to]) =>
            !(
              (from === selectedNode && to === id) ||
              (from === id && to === selectedNode)
            ),
        ),
      );
    } else {
      setConnections((current) => [...current, [selectedNode, id]]);
    }

    setSelectedNode(null);
  };

  const runWorkflow = () => {
    if (running || activeNodes.length < 2) return;

    setRunning(true);
    setRunCount((count) => count + 1);

    window.setTimeout(
      () => {
        setRunning(false);
      },
      reducedMotion ? 100 : 1800,
    );
  };

  const nodePositions: Record<NodeId, { x: number; y: number }> = {
    website: { x: 15, y: 27 },
    database: { x: 80, y: 23 },
    email: { x: 81, y: 76 },
    chat: { x: 50, y: 88 },
    payments: { x: 15, y: 75 },
    api: { x: 49, y: 49 },
  };

  const nodeById = Object.fromEntries(
    integrations.map((item) => [item.id, item]),
  ) as Record<NodeId, (typeof integrations)[number]>;

  return (
    <section className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="absolute inset-0 -z-10 bg-[var(--surface-secondary)] opacity-60" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="integration-kicker mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
            Build your connection
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Design a workflow.
            <br />
            <span className="integration-muted">See it come together.</span>
          </h2>
          <p className="integration-muted mx-auto mt-5 max-w-xl text-sm leading-7 sm:text-base">
            This is a small interactive model of how systems can connect. Add
            nodes, select two to create or remove a connection, then simulate
            a workflow run.
          </p>
        </div>

        <div className="integration-card mt-12 overflow-hidden rounded-[28px] sm:rounded-[36px]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--card-border)] px-5 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                <Workflow size={19} />
              </div>
              <div>
                <p className="text-sm font-semibold">Connection playground</p>
                <p className="integration-muted mt-1 text-xs">
                  Interactive demo · No accounts required
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[var(--card-border)] px-3 py-2 text-xs">
              <span
                className={`h-2 w-2 rounded-full ${running ? "animate-pulse bg-amber-400" : "bg-emerald-400"}`}
              />
              {running ? "Processing events…" : "Ready to run"}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_260px]">
            <ConnectionMap
              connections={connections}
              activeNodes={activeNodes}
              selectedNode={selectedNode}
              running={running}
              handleNodeClick={handleNodeClick}
              nodePositions={nodePositions}
              nodeById={nodeById}
            />

            <SystemsPanel
              activeNodes={activeNodes}
              toggleNode={toggleNode}
              running={running}
              runCount={runCount}
              runWorkflow={runWorkflow}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--card-border)] px-5 py-4 sm:px-8">
            <div className="flex items-center gap-2 text-xs integration-muted">
              <Settings2 size={14} />
              <span>Try different combinations and connections.</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveNodes(["website", "api", "database", "email"]);
                setConnections(initialConnections);
                setSelectedNode(null);
                setRunning(false);
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold transition hover:text-[var(--accent)]"
            >
              <RefreshCw size={13} /> Reset playground
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
