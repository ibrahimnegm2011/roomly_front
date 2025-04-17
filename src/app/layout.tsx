import "@/css/satoshi.css";
import "@/css/style.css";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";


export const metadata: Metadata = {
  title: {
    template: "%s | Roomly",
    default: "Roomly",
  },
  description:
    "Roomly - Manage your every room.",
};

export default function RootLayout({ children }: PropsWithChildren) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
