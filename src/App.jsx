import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import Tarifs from "./components/Tarifs";
import Accueil from "./components/Accueil";
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import FullScreenMenu from './components/FullScreenMenu';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Commande from './components/Commande';
import PrivateRoute from './components/PrivateRoute'; // ✅ ajouté


function App() {
  return (
    <>
      <ScrollToTop />
      <FullScreenMenu />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tarifs" element={<Tarifs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* ✅ Route protégée */}
        <Route
          path="/commande"
          element={
            <PrivateRoute>
              <Commande />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
