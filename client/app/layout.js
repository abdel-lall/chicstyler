import Navbar from "../components/navbar/navbar.component";
import Providers from "@/store/provider";
export const metadata = {
  title: "Chicstyler",
};
import "@/styles/global.scss";

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <Providers>
        <div className="app-container">
          <Navbar />
          {children}
        </div>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
