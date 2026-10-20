import { Check, Plus, RefreshCw, Zap } from "lucide-react";
import { integrations, type NodeId } from "./data";

export default function SystemsPanel({
  activeNodes,
  toggleNode,
  running,
  runCount,
  runWorkflow,
}: {
  activeNodes: NodeId[];
  toggleNode: (id: NodeId) => void;
  running: boolean;
  runCount: number;
  runWorkflow: () => void;
}) {
  return (
    <aside className="flex flex-col p-5 sm:p-6">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] integration-muted">
          Systems
        </p>
        <p className="mt-2 text-sm leading-6 integration-muted">
          Toggle the systems in your workflow.
        </p>
      </div>

      <div className="space-y-2">
        {integrations.map((node) => {
          const active = activeNodes.includes(node.id as NodeId);

          return (
            <button
              type="button"
              key={node.id}
              onClick={() => toggleNode(node.id as NodeId)}
              className="flex w-full items-center gap-3 rounded-xl border border-[var(--card-border)] px-3 py-3 text-left transition hover:border-[var(--accent)]"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold text-white"
                style={{
                  background: active
                    ? node.color
                    : "var(--text-secondary)",
                }}
              >
                {active ? node.symbol : <Plus size={14} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold">
                  {node.name}
                </span>
                <span className="mt-1 block text-[10px] integration-muted">
                  {node.category}
                </span>
              </span>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  active
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-[var(--card-border)]"
                }`}
              >
                {active && <Check size={11} />}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={runWorkflow}
          disabled={running || activeNodes.length < 2}
          className="integration-button-primary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        >
          {running ? (
            <>
              <RefreshCw size={16} className="animate-spin" /> Running
              workflow
            </>
          ) : (
            <>
              <Zap size={16} /> Run simulation
            </>
          )}
        </button>

        <p className="integration-muted mt-3 text-center text-[10px] leading-5">
          {activeNodes.length < 2
            ? "Add at least two systems to run."
            : runCount > 0 && !running
              ? `Simulation complete · ${runCount} run${runCount === 1 ? "" : "s"}`
              : "A visual demo, not a live connection."}
        </p>
      </div>
    </aside>
  );
}
