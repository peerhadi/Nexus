import { Check, Plus } from "lucide-react";
import { integrations, type NodeId } from "./data";

export default function ConnectionMap({
  connections,
  activeNodes,
  selectedNode,
  running,
  handleNodeClick,
  nodePositions,
  nodeById,
}: {
  connections: [NodeId, NodeId][];
  activeNodes: NodeId[];
  selectedNode: NodeId | null;
  running: boolean;
  handleNodeClick: (id: NodeId) => void;
  nodePositions: Record<NodeId, { x: number; y: number }>;
  nodeById: Record<NodeId, (typeof integrations)[number]>;
}) {
  return (
    <div className="relative min-h-[410px] overflow-hidden border-b border-[var(--card-border)] lg:border-b-0 lg:border-r">
      <div className="integration-grid absolute inset-0 opacity-40" />

      <div className="absolute left-5 top-5 z-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] integration-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        Connection map
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-label="Diagram of connections between selected systems"
      >
        {connections.map(([from, to], index) => {
          if (
            !activeNodes.includes(from) ||
            !activeNodes.includes(to)
          )
            return null;
          const a = nodePositions[from];
          const b = nodePositions[to];
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2 - 8;

          return (
            <g key={`${from}-${to}-${index}`}>
              <path
                d={`M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`}
                stroke="var(--accent)"
                strokeWidth="0.35"
                fill="none"
                opacity={running ? 1 : 0.55}
                className={`integration-flow-line ${running ? "" : "is-idle"}`}
                vectorEffect="non-scaling-stroke"
              />
              {running && (
                <circle r="1.1" fill="var(--accent)">
                  <animateMotion
                    dur={`${0.8 + index * 0.25}s`}
                    repeatCount="indefinite"
                    path={`M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {integrations.map((node) => {
        const position = nodePositions[node.id as NodeId];
        const active = activeNodes.includes(node.id as NodeId);
        const selected = selectedNode === node.id;

        return (
          <button
            key={node.id}
            type="button"
            onClick={() => handleNodeClick(node.id as NodeId)}
            aria-pressed={selected}
            aria-label={`${node.name}${active ? "" : ", add to workflow"}`}
            className={`integration-node absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border p-2.5 sm:p-3 ${
              active
                ? "bg-[var(--card)]"
                : "border-dashed bg-[var(--surface-secondary)] opacity-60"
            } ${selected ? "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--card)]" : ""}`}
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              borderColor: selected
                ? "var(--accent)"
                : active
                  ? node.color
                  : "var(--card-border)",
              boxShadow: selected
                ? `0 0 30px ${node.color}35`
                : undefined,
              minWidth: 76,
            }}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold text-white sm:h-11 sm:w-11"
              style={{
                background: active
                  ? `linear-gradient(145deg, ${node.color}, ${node.color}99)`
                  : "var(--surface-secondary)",
                color: active ? "white" : "var(--text-secondary)",
                boxShadow: active
                  ? `0 6px 18px ${node.color}30`
                  : "none",
              }}
            >
              {active ? node.symbol : <Plus size={17} />}
            </span>
            <span className="max-w-[82px] truncate text-[10px] font-semibold sm:text-xs">
              {node.name}
            </span>
            {selected && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                <Check size={11} />
              </span>
            )}
          </button>
        );
      })}

      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3 py-1.5 text-[10px] integration-muted">
          {selectedNode
            ? `Choose another node to connect to ${nodeById[selectedNode].name}`
            : "Select any node to start"}
        </span>
        <span className="rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3 py-1.5 text-[10px] integration-muted">
          {connections.length} connection
          {connections.length === 1 ? "" : "s"}
        </span>
      </div>
    </div>
  );
}
