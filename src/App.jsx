import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Composants partagés
import ScrollToTop from './shared/ScrollToTop';
import ScrollButton from "./shared/ScrollButton";
import FullScreenMenu from "./memberApp/pages/FullScreenMenu";
import PublicFooter from "./publicSite/components/PublicFooter";

// Pages publiques
import Accueil from "./publicSite/pages/Accueil";
import Services from "./publicSite/pages/Services";
import Projects from "./publicSite/pages/Projects";
import Tarifs from "./publicSite/pages/Tarifs";
import About from "./publicSite/pages/About";
import Contact from './memberApp/pages/Contact';
import Login from "./publicSite/pages/Login";
import Signup from "./publicSite/pages/Signup";

// Composants membres
import BottomBar from "./memberApp/components/BottomBar";
import MemberFooter from "./memberApp/components/Footer";

// Pages membres (protégées)
import Commande from "./memberApp/pages/Commande";
import Estimation from "./memberApp/pages/Estimation";
import Reservation from "./memberApp/pages/Reservation";
import Profil from "./memberApp/pages/Profil";
import DashboardAccueil from "./memberApp/pages/DashboardAccueil"; // en haut du fichier
import Support from "./memberApp/pages/Support";

// Routes protégées
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const isOnMemberPage = ["/dashboard", "/commande", "/reservation", "/estimation", "/profil", "/support"].includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <FullScreenMenu />

      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<Accueil />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tarifs" element={<Tarifs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Pages membres protégées */}
        <Route path="/commande" element={<PrivateRoute><Commande /></PrivateRoute>} />
        <Route path="/reservation" element={<PrivateRoute><Reservation /></PrivateRoute>} />
        <Route path="/estimation" element={<PrivateRoute><Estimation /></PrivateRoute>} />
        <Route path="/profil" element={<PrivateRoute><Profil /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardAccueil /></PrivateRoute>} />
        <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />

      </Routes>

      {/* Affichage du footer et de la bottom bar */}
      {isAuthenticated && isOnMemberPage && <BottomBar />}
      {isAuthenticated && isOnMemberPage ? <MemberFooter /> : <PublicFooter />}
      
      <ScrollButton />
    </>
  );
}

export default App;
