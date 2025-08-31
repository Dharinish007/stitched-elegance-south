import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileContactBar from "./MobileContactBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <MobileContactBar />
      <Footer />
    </div>
  );
};

export default Layout;