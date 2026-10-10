import type { Metadata } from "next";
import "./globals.css";
import { AlertProvider } from "@/lib/alert";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexusbuilds.vercel.app"),

  title: {
    default: "Nexus Builds | Web & Software Development",
    template: "%s | Nexus Builds",
  },

  description:
    "Nexus Builds designs and develops modern websites, web applications, and digital products. Build, connect, and create with Nexus.",

  applicationName: "Nexus Builds",

  keywords: [
    "Nexus Builds",
    "web development",
    "website development",
    "web application development",
    "custom software development",
    "digital products",
    "technology consulting",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://nexusbuilds.vercel.app",
    siteName: "Nexus Builds",
    title: "Nexus Builds | Web & Software Development",
    description:
      "We build modern websites, web applications, and digital products. Build. Connect. Create.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nexus Builds | Web & Software Development",
    description:
      "Modern websites, web applications, and digital products. Build. Connect. Create.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const themeScript = `
(function () {
  try {
    var mode = localStorage.getItem("nexus_mode");

    if (mode !== "dark" && mode !== "light") {
      mode = "light";
      localStorage.setItem("nexus_mode", "light");
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
