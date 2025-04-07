import localFont from "next/font/local";
import "./styles/style.sass";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const montrealMed = localFont({
  src: "./fonts/PPNeueMontreal-Medium.otf",
  variable: "--font-montreal-medium",
  weight: "500",
});

const montrealBook = localFont({
  src: "./fonts/PPNeueMontreal-Book.otf",
  variable: "--font-montreal-book",
  weight: "400",
});

export const metadata = {
  title: "adtimokhin | website design for startups",
  description:
    "Modern, interactive website design for startups by adtimokhin. Helping early-stage businesses stand out with clean, functional, and impactful websites.",
  keywords:
    "web design, website design, web designer, adtimokhin, adtimokhin web design, adtimokhin portfolio, website design for startups, startup websites, interactive web design, clean web design, modern websites, responsive web design, minimal web design, startup landing pages, custom website development, professional website design, adtimokhin designer, adtimokhin websites, adtimokhin startup websites",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montrealMed.variable} ${montrealBook.variable}`}>
        <NavBar />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
