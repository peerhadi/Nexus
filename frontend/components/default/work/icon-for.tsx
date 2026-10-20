import {
  BookOpen,
  Boxes,
  CalendarDays,
  Command,
  Eye,
  GitBranch,
  Layers3,
  Orbit,
  PanelsTopLeft,
  Radio,
  Rss,
  ScanLine,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

export default function IconFor({
  name,
  size = 20,
}: {
  name: string;
  size?: number;
}) {
  const props = { size, strokeWidth: 1.7 };

  switch (name) {
    case "feeds":
      return <Rss {...props} />;
    case "classify":
      return <Layers3 {...props} />;
    case "perspectives":
      return <Orbit {...props} />;
    case "reading":
      return <BookOpen {...props} />;
    case "workspace":
      return <PanelsTopLeft {...props} />;
    case "browser":
      return <Eye {...props} />;
    case "projects":
      return <Boxes {...props} />;
    case "focus":
      return <ScanLine {...props} />;
    case "message":
      return <Radio {...props} />;
    case "extract":
      return <Sparkles {...props} />;
    case "structure":
      return <Workflow {...props} />;
    case "calendar":
      return <CalendarDays {...props} />;
    case "systems":
      return <Command {...props} />;
    case "scene":
      return <Orbit {...props} />;
    case "growth":
      return <GitBranch {...props} />;
    default:
      return <Zap {...props} />;
  }
}
