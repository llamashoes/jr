import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jen & Ryan Are Getting Married!!!",
  description: "Save the date for Jen and Ryan's totally awesome wedding celebration on September 28, 2026.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
