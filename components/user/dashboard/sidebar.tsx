import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SidebarNav from "./sidebar-nav";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[235px] border-r border-black/5 bg-white/80 px-4 py-5 backdrop-blur-2xl lg:flex lg:flex-col">
      <Link href="/" className="mb-8 flex items-center gap-3 px-2">
        <ArrowLeft />
        Back to Nexus
      </Link>

      <div className="mb-3 px-2 text-[9px] font-black uppercase tracking-[0.2em] text-black/30">
        Workspace
      </div>

      <SidebarNav />
    </aside>
  );
}
