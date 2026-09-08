import type { Metadata } from "next";
import "./globals.css";
import "../styles/factura-fonts.css";
import "../styles/bootstrap.css";
import "../styles/factura.css";
import "../styles/factura-fix.css";
import "../styles/factura-motion.css";
import "../styles/factura-apple.css";

export const metadata: Metadata = {
  title: "Datrix Tech Solutions | WorkPhelo Business Management Software",
  description:
    "WorkPhelo by Datrix Tech Solutions unites every tool your business needs in one smart suite — AccountingPhelo online accounting, HRPhelo HRMS, Customized Software and MarketingPhelo CRM.",
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
