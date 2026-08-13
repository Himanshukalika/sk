import type { Metadata } from "next";
import "./globals.css";
import TopNotificationBar from "@/components/TopNotificationBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export const metadata: Metadata = {
  title: "SK Fire Agency | Best Fire Guard, Fireman & Fire Operator Exam Coaching Institute",
  description: "SK Fire Agency is India's premier coaching academy for Fire Guard, Fireman, Fire Operator, DFS, CISF, and State Fire Service written exam preparation and physical ground training.",
  keywords: [
    "Fire Guard Coaching",
    "Fireman Exam Preparation",
    "SK Fire Agency",
    "Fire Operator Driver Batch",
    "Delhi Fire Service DSSSB Coaching",
    "CISF Fireman Physical Training",
    "Fire Safety Diploma Coaching",
    "Fireman Physical Ground"
  ],
  authors: [{ name: "SK Fire Agency" }],
  openGraph: {
    title: "SK Fire Agency - #1 Fire & Safety Coaching Institute",
    description: "Dedicated coaching for Fire Guard, Fireman, Fire Operator, and Fire Physical Ground Training with hostel facility.",
    type: "website",
    locale: "en_IN",
    siteName: "SK Fire Agency Coaching"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-50 text-neutral-900 selection:bg-red-600 selection:text-white">
        <TopNotificationBar />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
