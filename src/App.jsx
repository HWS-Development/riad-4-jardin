import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Rooms from "./pages/Rooms.jsx";
import Spa from "./pages/Spa.jsx";
import Services from "./pages/Services.jsx";
import Restaurant from "./pages/Restaurant.jsx";
import Gallery from "./pages/Gallery.jsx";


export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chambres" element={<Rooms />} />
        <Route path="/spa" element={<Spa />} />
        <Route path="/services-activites" element={<Services />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/galerie" element={<Gallery />} />
    
      </Routes>
    </Layout>
  );
}
