import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import "./globals.css";
import theme from "@/theme";

export const metadata: Metadata = {
  title: "Shop",
  description: "Peyman Khalili",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  admin: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
