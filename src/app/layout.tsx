import type { Metadata } from "next";
import "./globals.css";
import "../styles/factura-fonts.css";
import "../styles/bootstrap.css";
import "../styles/factura.css";
import "../styles/factura-fix.css";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Factura is a complete suite of functionality tools for managing your business smartly. Online accounting software, HRMS, Contract Management and CRM.",
  robots: "index, follow",
  icons: {
    icon: "/assets/img/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="body- index antialiased" id="index">
        {children}
      </body>
    </html>
  );
}
