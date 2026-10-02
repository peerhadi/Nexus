import "./globals.css";
import { AlertProvider } from "@/lib/alert";

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
