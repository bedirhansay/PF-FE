import { ClientOnly } from "@/components/ClientOnly";
import { Header } from "../../container/HomePage/header/header";
import { ActiveSectionProvider } from "../../lib/contex";
import "./globals.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="layout">
      <div className="header-left-color"></div>
      <div className="header-right-color"></div>
      <ActiveSectionProvider>
        <ClientOnly>
          <Header />
          {children}
        </ClientOnly>
      </ActiveSectionProvider>
    </main>
  );
}
