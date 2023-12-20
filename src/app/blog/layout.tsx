import { Urbanist } from "next/font/google";
const inter = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="bg-[#F3F4F6]">{children}</main>;
}
