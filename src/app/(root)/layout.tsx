
import { Header } from "../../container/HomePage/header/header";
import { ActiveSectionProvider } from "../../lib/contex";

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
        <Header />
        {children}
      </ActiveSectionProvider>
    </main>
  );
}
