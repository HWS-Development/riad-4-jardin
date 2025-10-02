import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    window.location.replace("https://riad4jardin-com-358766.builder-preview.com/");
  }, []);

  return null; // nothing will render, it will redirect immediately
}

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Header from "./components/layout/Header";
// import Footer from "./components/layout/Footer";

// import Home from "./pages/Home"
// // import Rooms from "./pages/Rooms"
// // import Services from "./pages/Services"
// // import Gallery from "./pages/Gallery"
// // import Contact from "./pages/Contact"
// // import Terms from "./pages/Terms"

// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen bg-lightBg">
//       <Header
//         logoSrc="/logo.svg" // replace with your logo path
//         bookingUrl="https://your-hotelrunner-url.example.com/bv3/search"
//       />
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             {/* <Route path="/rooms" element={<Rooms />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/gallery" element={<Gallery />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/terms" element={<Terms />} /> */}
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   )
// }

// export default App

