import Footer from "@/components/landing-page/Footer/Footer";
import Nav from "@/components/landing-page/Nav/Nav";

const RootLayout = ({ children }) => {
  return (
    <main>
      <Nav/>
      {children}
      <Footer />
    </main>
  );
};

export default RootLayout;
