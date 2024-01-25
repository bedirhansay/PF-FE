import { Sidebar } from "@/components/Sidebar";
import { Metadata } from "next";
// import "../../global.css";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard - Panel",
  keywords: [
    "Bedirhan Say",
    "Freelance",
    "Portföy",
    "Blog",
    "Hizmetler",
    "Web Geliştirme",
    "Yazılım",
    "Tasarım",
    "E-Ticaret",
  ],
  authors: [{ name: "Bedirhan Say" }],

  robots: {
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex bg-gray-100 gap-4 px-4 ">
      <div className="fixed z-10 left-0 top-0 bottom-0">
        <Sidebar />
      </div>
      <div className="ml-0 sm:ml-36 w-full overflow-x-hidden">{children}</div>
    </main>
  );
}
