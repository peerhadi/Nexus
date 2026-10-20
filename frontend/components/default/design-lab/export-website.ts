"use client";

import JSZip from "jszip";

export async function exportWebsite(siteName: string) {
  const preview = document.querySelector(
    "#design-lab-site",
  ) as HTMLElement | null;
  if (!preview) return;

  const zip = new JSZip();
  const clone = preview.cloneNode(true) as HTMLElement;

  const computed = getComputedStyle(preview);

  for (let i = 0; i < computed.length; i++) {
    const property = computed[i];

    if (property.startsWith("--")) {
      clone.style.setProperty(
        property,
        computed.getPropertyValue(property),
        computed.getPropertyPriority(property),
      );
    }
  }

  clone.style.fontFamily = computed.fontFamily;
  clone.style.color = computed.color;
  clone.style.backgroundColor = computed.backgroundColor;
  clone.style.width = "100%";
  clone.style.height = "auto";
  clone.style.minHeight = "100vh";
  clone.style.overflow = "visible";
  clone.style.maxWidth = "none";
  clone.removeAttribute("id");
  clone.querySelectorAll("button").forEach((button) => {
    button.removeAttribute("onclick");
  });
  const originalElements = [
    preview,
    ...Array.from(preview.querySelectorAll("*")),
  ];

  const clonedElements = [clone, ...Array.from(clone.querySelectorAll("*"))];

  originalElements.forEach((original, index) => {
    const cloned = clonedElements[index] as HTMLElement | undefined;
    if (!cloned) return;

    const styles = getComputedStyle(original);

    [
      "color",
      "backgroundColor",
      "fontFamily",
      "fontSize",
      "fontWeight",
      "lineHeight",
      "letterSpacing",
      "borderColor",
      "borderRadius",
      "boxShadow",
      "opacity",
    ].forEach((property) => {
      const cssProperty = property.replace(
        /[A-Z]/g,
        (letter) => `-${letter.toLowerCase()}`,
      );

      cloned.style.setProperty(
        cssProperty,
        styles.getPropertyValue(cssProperty),
      );
    });
  });
  const images = Array.from(clone.querySelectorAll("img"));

  for (let i = 0; i < images.length; i++) {
    const img = images[i];

    if (img.src.startsWith("blob:")) {
      try {
        const response = await fetch(img.src);
        const blob = await response.blob();
        const extension = blob.type.split("/")[1] || "png";
        const filename = `image-${i + 1}.${extension}`;

        zip.file(`assets/${filename}`, blob);
        img.src = `assets/${filename}`;
      } catch {
        img.removeAttribute("src");
      }
    }
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${siteName || "My Website"}</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  width: 100%;
  min-height: 100%;
}

body {
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

#site-root {
  min-height: 100vh;
  width: 100%;
}
#scrollContainer {
  min-height: 100vh !important;
}
img {
  max-width: 100%;
}
</style>
</head>
<body>
<main id="site-root">${clone.innerHTML}</main>
</body>
</html>`;

  zip.file("index.html", html);

  const file = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${(siteName || "website").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.zip`;
  link.click();

  URL.revokeObjectURL(url);
}
