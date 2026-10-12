import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PublicAIChat from "./components/PublicAIChat";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <PublicAIChat />
    </>
  );
}
