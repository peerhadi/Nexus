import type { Metadata } from "next";
import "./globals.css";
import { AlertProvider } from "@/lib/alert";

export const metadata: Metadata = {
  title: "Nexus",
  description: "Nexus — Build. Connect. Create.",
};

const themeScript = `
(function () {
  try {
    var mode = localStorage.getItem("nexus_mode");

    if (mode !== "dark" && mode !== "light") {
      mode = "light";
      localStorage.setItem("nexus_mode", "dark");
    }

    var theme = localStorage.getItem("nexus_theme");

    if (
      theme !== "neon" &&
      theme !== "aurora" &&
      theme !== "violet" &&
      theme !== "sunrise"
    ) {
      theme = "neon";
      localStorage.setItem("nexus_theme", "neon");
    }

    var root = document.documentElement;

    root.classList.remove("dark");
    root.dataset.theme = theme;

    if (mode === "dark") {
      root.classList.add("dark");
    }
  } catch (error) {
    var root = document.documentElement;

    root.classList.remove("dark");
    root.dataset.theme = "neon";
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body>
        <AlertProvider>{children}</AlertProvider>
      </body>
    </html>
  );
}
