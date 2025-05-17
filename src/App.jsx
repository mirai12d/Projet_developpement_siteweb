import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Composants partagés
import ScrollToTop from './shared/ScrollToTop';
import ScrollButton from "./shared/ScrollButton";
import FullScreenMenu from "./memberApp/pages/FullScreenMenu";
import PublicFooter from "./publicSite/components/PublicFooter";
import Loader from "./shared/Loader"; 

// Pages publiques
import Accueil from "./publicSite/pages/Accueil";
import Services from "./publicSite/pages/Services";
import Projects from "./publicSite/pages/Projects";
import About from "./publicSite/pages/About";
import Contact from './memberApp/pages/Contact';
import Login from "./publicSite/pages/Login";
import Signup from "./publicSite/pages/Signup";
import VerifyEmail from './publicSite/pages/VerifyEmail';
// Composants membres
import BottomBar from "./memberApp/components/BottomBar";
import MemberFooter from "./memberApp/components/Footer";

// Pages membres (protégées)
import Estimation from "./memberApp/pages/Estimation";
import Reservation from "./memberApp/pages/Reservation";
import Profil from "./memberApp/pages/Profil";
import DashboardAccueil from "./memberApp/pages/DashboardAccueil";
import Support from "./memberApp/pages/Support";
import Factures from './memberApp/pages/Factures';
// Routes protégées
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  const isOnMemberPage =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/commande") ||
    location.pathname.startsWith("/reservation") ||
    location.pathname.startsWith("/estimation") ||
    location.pathname.startsWith("/profil") ||
    location.pathname.startsWith("/support") ||
    location.pathname.startsWith("/factures");

  if (loading) return <Loader />; // ✅ Affichage du loader pendant la vérification

  return (
    <>
      <ScrollToTop />
      <FullScreenMenu />

      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<Accueil />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        
        {/* Pages membres protégées */}
        <Route path="/reservation" element={<PrivateRoute><Reservation /></PrivateRoute>} />
        <Route path="/estimation" element={<PrivateRoute><Estimation /></PrivateRoute>} />
        <Route path="/profil" element={<PrivateRoute><Profil /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardAccueil /></PrivateRoute>} />
        <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />
        <Route path="/factures" element={<PrivateRoute><Factures/></PrivateRoute>} />
      </Routes>

      {/* Footer et BottomBar conditionnels */}
      {isAuthenticated && isOnMemberPage && <BottomBar />}
      {isAuthenticated && isOnMemberPage ? <MemberFooter /> : <PublicFooter />}

      <ScrollButton />
    </>
  );
}

export default App;
