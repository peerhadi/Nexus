import VisualAi from "./visual-ai";
import VisualApplication from "./visual-application";
import VisualAutomation from "./visual-automation";
import VisualIntegrations from "./visual-integrations";
import VisualWebsite from "./visual-website";

export default function ServiceVisual({
  type,
  reduceMotion,
}: {
  type: string;
  reduceMotion: boolean | null;
}) {
  if (type === "website") {
    return <VisualWebsite reduceMotion={reduceMotion} />;
  }

  if (type === "application") {
    return <VisualApplication reduceMotion={reduceMotion} />;
  }

  if (type === "automation") {
    return <VisualAutomation reduceMotion={reduceMotion} />;
  }

  if (type === "ai") {
    return <VisualAi reduceMotion={reduceMotion} />;
  }

  return <VisualIntegrations reduceMotion={reduceMotion} />;
}
