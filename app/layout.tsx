import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import SyncUser from "./SyncUser"; // ✅ import client component
import Navbar from "@/components/Nav/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Vistara Styles",
  description: "Admin & Storefront",
};

export const experimental_ppr = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClerkProvider>
          <ConvexClientProvider>
            <SyncUser />
            <Navbar />
            {children}
            <Footer />
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
