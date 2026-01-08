import { Quicksand, Ubuntu } from "next/font/google";
import "./globals.css";
import Navbar from "./component/navbar/Navbar";
import Footer from "./component/footer/Footer";
import LenisProvider from "./component/LenisProvider";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "iLMiFY Techagency",
  description: "A proper solution for your business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${ubuntu.variable} font-sans bg-white text-gray-900`}
      >
        <LenisProvider>
          <Navbar />
          <main>
            {children}
            <Footer />
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
