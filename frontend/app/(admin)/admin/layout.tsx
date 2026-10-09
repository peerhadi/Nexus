import Sidebar from "./components/sidebar";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="min-w-0 lg:ml-[250px] w-full">{children}</main>
    </div>
  );
}
