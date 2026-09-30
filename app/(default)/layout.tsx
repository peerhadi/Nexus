import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
