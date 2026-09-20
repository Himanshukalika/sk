import type { Metadata } from "next";
import "./globals.css";
import TopNotificationBar from "@/components/TopNotificationBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export const metadata: Metadata = {
  title: "Shri Krishna Fire & Safety Academy (Paota, Jaipur) | Premier Fireman & Safety Training Institute",
  description: "Shri Krishna Fire & Safety Academy (Est. 2014) is Rajasthan's leading institute for Fire Guard, Fireman, Fire Driver/Operator, DFS, CISF, and Industrial Safety courses with 400m physical ground and hostel facilities in Paota, Jaipur.",
  keywords: [
    "Shri Krishna Fire and Safety Academy",
    "SK Fire Academy Paota",
    "Fireman Coaching Jaipur",
    "Fire Guard Preparation",
    "Fire Operator Driver Batch",
    "CISF Fireman Physical Ground",
    "Delhi Fire Service DSSSB Coaching",
    "NCVT Fire Safety Diploma",
    "Fire Safety Academy Rajasthan"
  ],
  authors: [{ name: "Shri Krishna Fire & Safety Academy" }],
  openGraph: {
    title: "Shri Krishna Fire & Safety Academy — #1 Fire & Safety Institute",
    description: "Dedicated coaching for Fire Guard, Fireman, Fire Driver, and Practical Physical Ground Training with residential hostel in Paota, Jaipur.",
    type: "website",
    locale: "en_IN",
    siteName: "Shri Krishna Fire & Safety Academy"
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
