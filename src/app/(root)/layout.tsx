import { Header } from "../../components/HomePage/header/header";
import "../global.scss";
import "../tailwind.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="layout">
      <div className="header-left-color"></div>
      <div className="header-right-color"></div>
      <Header />
      {children}
    </main>
  );
}
