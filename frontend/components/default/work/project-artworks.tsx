import type { WorkProject } from "./data";
import VisualShell from "./visual-shell";

export function PrismArtwork() {
  return (
    <VisualShell>
      <img src="/screenshots/projects/prism/home.png" />
    </VisualShell>
  );
}

export function ObsidianArtwork() {
  return (
    <VisualShell className="max-h-[570px]">
      <div
        className="relative overflow-hidden rounded-[inherit] flex justify-center"
        style={{
          background:
            "linear-gradient(135deg,#090014 0%,#190038 35%, #310078 68%, #130024 100%)",
        }}
      >
        <img
          src="/screenshots/projects/obsidian/home.png"
          style={{ maxHeight: "570px" }}
        />
      </div>
    </VisualShell>
  );
}

export function NotifierArtwork() {
  return (
    <VisualShell className="min-h-[570px]">
      <img
        src="/screenshots/projects/notifier/home.png"
        style={{ minHeight: "600px" }}
      />
    </VisualShell>
  );
}

export function EngineArtwork() {
  return (
    <VisualShell className="min-h-[570px]">
      <img src="/screenshots/projects/engine/home.png" />
    </VisualShell>
  );
}

export default function ProjectArtwork({ project }: { project: WorkProject }) {
  switch (project.visual) {
    case "prism":
      return <PrismArtwork />;
    case "obsidian":
      return <ObsidianArtwork />;
    case "notifier":
      return <NotifierArtwork />;
    case "engine":
      return <EngineArtwork />;
    default:
      return null;
  }
}
