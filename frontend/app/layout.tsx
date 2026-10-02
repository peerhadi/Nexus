import type { Metadata } from "next";
import "./globals.css";
import { AlertProvider } from "@/lib/alert";

export const metadata: Metadata = {
  title: "Nexus",
  description: "Nexus — Build. Connect. Create.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AlertProvider>{children}</AlertProvider>
      </body>
    </html>
  );
}
