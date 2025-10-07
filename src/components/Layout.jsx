import Header from "./Header.jsx";
import Footer from "./Footer.jsx";



export default function Layout({ children }) {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-brand-charcoal">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}


  