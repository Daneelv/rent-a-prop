import "@/assets/styles/globals.css";

export const metadata = {
  title: "RentaProp | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rental properties, property near me",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
