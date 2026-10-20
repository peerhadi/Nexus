"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import DesignLabControls from "@/components/default/design-lab/design-lab-controls";
import DesignLabHeader from "@/components/default/design-lab/design-lab-header";
import PreviewPanel from "@/components/default/design-lab/preview-panel";
import { siteTypes, themes } from "@/components/default/design-lab/data";
import type {
  AnimationType,
  SiteType,
  ThemeType,
} from "@/components/default/design-lab/types";

export default function DesignLabPage() {
  const [siteType, setSiteType] = useState<SiteType>("ecommerce");
  const [themeType, setThemeType] = useState<ThemeType>("prism");
  const [animation, setAnimation] = useState<AnimationType>("rise");
  const [keywords, setKeywords] = useState("modern, thoughtful, premium");
  const [siteName, setSiteName] = useState("FORMA");
  const [showCta, setShowCta] = useState(true);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [generated, setGenerated] = useState(0);
  const [showOptions, setShowOptions] = useState(true);

  const theme = themes[themeType];

  const currentSite = useMemo(
    () => siteTypes.find((item) => item.id === siteType)!,
    [siteType],
  );

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const urls = files
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, Math.max(0, 4 - uploadedImages.length))
      .map((file) => URL.createObjectURL(file));

    setUploadedImages((current) => [...current, ...urls].slice(0, 4));
    event.target.value = "";
  };

  const removeImage = (index: number) => {
    setUploadedImages((current) => {
      const removed = current[index];
      if (removed?.startsWith("blob:")) URL.revokeObjectURL(removed);
      return current.filter((_, imageIndex) => imageIndex !== index);
    });
  };

  const reset = () => {
    setSiteType("ecommerce");
    setThemeType("prism");
    setAnimation("rise");
    setKeywords("modern, thoughtful, premium");
    setSiteName("FORMA");
    setShowCta(true);
    setGenerated((current) => current + 1);
  };

  const regenerate = () => setGenerated((current) => current + 1);

  return (
    <main
      className="min-h-screen "
      style={{
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <div className="pointer-events-none fixed inset-0 -z-0 ">
        <div
          className="absolute -left-40 top-20 h-96 w-96 rounded-full opacity-20 blur-[100px]"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute -right-40 top-[35%] h-96 w-96 rounded-full opacity-20 blur-[110px]"
          style={{ background: "var(--gradient-secondary)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-10 lg:py-10 overflow-hidden">
        <DesignLabHeader onReset={reset} />

        <div className="grid items-start gap-5 xl:grid-cols-[310px_minmax(0,1fr)]">
          <DesignLabControls
            siteType={siteType}
            setSiteType={setSiteType}
            themeType={themeType}
            setThemeType={setThemeType}
            animation={animation}
            setAnimation={setAnimation}
            keywords={keywords}
            setKeywords={setKeywords}
            siteName={siteName}
            setSiteName={setSiteName}
            showCta={showCta}
            setShowCta={setShowCta}
            uploadedImages={uploadedImages}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            onRegenerate={regenerate}
          />

          <PreviewPanel
            currentSite={currentSite}
            theme={theme}
            themeType={themeType}
            siteType={siteType}
            animation={animation}
            keywords={keywords}
            uploadedImages={uploadedImages}
            showCta={showCta}
            siteName={siteName}
            generated={generated}
            onRegenerate={regenerate}
          />
        </div>
      </div>
    </main>
  );
}
