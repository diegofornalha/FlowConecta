import { Cabin } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Providers } from "./providers";
import ChatIcon from "@/components/chat-icon";

export const metadata = {
  title: "Butter",
  description: "Butterize your side events journey with full of vitalik butterin",
};

const cabin = Cabin({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${cabin.className} antialiased`}
      >
       <Providers>
        <Navbar />
        <ChatIcon />
        {children}
       </Providers>
      </body>
    </html>
  );
}
