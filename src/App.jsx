import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import Tarifs from "./components/Tarifs";
import Accueil from "./components/Accueil";
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Commande from './components/Commande';



function App() {
  return (
    <>
  <ScrollToTop />
  <Header />
  <Routes>
    <Route path="/tarifs" element={<Tarifs />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/" element={<Accueil />} />
    <Route path="/services" element={<Services />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/commande" element={<Commande />} />
  </Routes>
  <Footer />
</>

  );
}

export default App;
