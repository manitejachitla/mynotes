import { Inter } from "next/font/google";
import "./globals.css";
import {Header} from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Notes",
  description: "Personal Notes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div>
        <Header/>
      </div>
      {children}
      </body>
    </html>
  );
}
