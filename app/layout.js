import { Quicksand, Ubuntu } from "next/font/google";
import "./globals.css";
import Navbar from "./component/navbar/Navbar";
import Footer from "./component/footer/Footer";
import SmoothScroll from "./component/SmoothScroll";

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
      <body className="your-font-classes">
        <Navbar /> {/* fixed navbar outside scroll */}
        <SmoothScroll>
          <main id="page-content" >
            {children}
            <Footer />
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
