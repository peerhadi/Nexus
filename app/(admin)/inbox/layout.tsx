import Sidebar from "./components/sidebar";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}
