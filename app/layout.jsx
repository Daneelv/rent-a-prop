import "@/assets/styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "RentaProp | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rental properties, property near me",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
