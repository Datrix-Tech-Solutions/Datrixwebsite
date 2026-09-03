import type { Metadata } from "next";
import "./globals.css";
import "../styles/factura-fonts.css";
import "../styles/bootstrap.css";
import "../styles/factura.css";
import "../styles/factura-fix.css";

export const metadata: Metadata = {
  title: "Datrix Tech Solutions | Business Management Software",
  description:
    "Datrix is a complete suite of functionality tools for managing your business smartly. Online accounting software, HRMS, Customized Software and CRM.",
  robots: "index, follow",
  icons: {
    icon: "/assets/img/datrix-mark.png",
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
