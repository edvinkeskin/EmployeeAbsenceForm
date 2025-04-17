'use client';

import "./globals.css";
import React from "react";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/theme/theme';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
