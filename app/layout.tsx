import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casey & Jordan Are Getting Married!!!",
  description: "Save the date for Casey and Jordan's totally awesome wedding celebration.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
