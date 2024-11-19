import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Vazirmatn } from "next/font/google";
import AuthProvider from "@/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";

const vazir = Vazirmatn({ subsets: ["latin"] });

export const metadata = {
  title: "Wedding Planer",
  description: "Wedding Planer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body className={vazir.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
