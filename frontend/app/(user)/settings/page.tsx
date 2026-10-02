import Navbar from "@/app/(default)/components/Navbar";
import SettingsContent from "./settings-content";
import Footer from "@/app/(default)/components/Footer";

export default function SettingsPage() {
  return (
    <div>
      <Navbar />
      <SettingsContent />;
      <Footer />
    </div>
  );
}
