import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
// import { SiteHeader } from "@/components/site-header";
// import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
    title: "Nessim CLI - Build Full-Stack Apps Fast",
    description:
        "Nessim CLI is a powerful command-line tool to streamline full-stack development with multiple frameworks.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {/* <SiteHeader /> */}
                    {children}
                    {/* <SiteFooter /> */}
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
