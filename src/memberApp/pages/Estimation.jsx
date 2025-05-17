import React, { useState } from 'react';
import './Estimation.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

const examples = [
  {
    id: 'site_vitrine',
    title: 'Site Vitrine – Photographe',
    description: 'Un site simple, élégant et responsive pour présenter votre activité.',
    image: '/examples/photographe.jpg'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce – Mode',
    description: 'Une boutique en ligne complète avec paiement intégré.',
    image: '/examples/ecommerce.jpg'
  },
  {
    id: 'portfolio',
    title: 'Portfolio – Freelance',
    description: 'Un site personnel pour mettre en avant vos projets et compétences.',
    image: '/examples/portfolio.jpg'
  },
  {
    id: 'corporate',
    title: 'Site Corporate – Entreprise',
    description: 'Un site professionnel pour votre société avec formulaire de contact et services.',
    image: '/examples/corporate.jpg'
  }
];

const Estimation = () => {
  const [selectedExample, setSelectedExample] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    entreprise: '',
    budget: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      service: selectedExample || 'non précisé'
    };

    try {
      const response = await fetch('http://localhost:3001/api/estimation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });

      if (response.ok) {
        toast.success("Votre demande d'estimation a été envoyée !");
        setFormData({
          nom: '',
          email: '',
          entreprise: '',
          budget: '',
          message: ''
        });
        setSelectedExample(null);
      } else {
        toast.error("Erreur lors de l'envoi.");
      }
    } catch (err) {
      console.error('Erreur réseau :', err);
      toast.error("Erreur réseau.");
    }
  };

  return (
    <div className="estimation-container">
      <h2>Obtenez une estimation personnalisée</h2>
      <p className="estimation-subtitle">Choisissez un exemple de site, puis décrivez votre besoin.</p>

      <div className="examples-grid">
        {examples.map(example => (
          <motion.div
            key={example.id}
            className={`example-card ${selectedExample === example.id ? 'selected' : ''}`}
            onClick={() => {
              setSelectedExample(example.id);
              setModalOpen(true);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <img src={example.image} alt={example.title} />
            <h3>{example.title}</h3>
            <p>{example.description}</p>
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="estimation-form">
        <input type="text" name="nom" placeholder="Votre nom" value={formData.nom} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Votre adresse email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="entreprise" placeholder="Nom de votre entreprise (optionnel)" value={formData.entreprise} onChange={handleChange} />
        <select name="budget" value={formData.budget} onChange={handleChange}>
          <option value="">Budget estimé</option>
          <option value="500-1000">500$ – 1000$</option>
          <option value="1000-3000">1000$ – 3000$</option>
          <option value="3000+">Plus de 3000$</option>
        </select>
        <textarea
          name="message"
          placeholder="Décrivez votre besoin en quelques lignes..."
          rows="6"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Envoyer la demande</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem' }}>
        Vous préférez discuter directement ?&nbsp;
        <a href="/member/reservation" style={{ color: '#111', textDecoration: 'underline' }}>
          Réservez un appel ou une rencontre ici
        </a>
      </p>

      <ToastContainer position="bottom-right" autoClose={3000} />

      <AnimatePresence>
        {modalOpen && selectedExample && (
          <motion.div
            className="fullscreen-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-content">
              <button onClick={() => setModalOpen(false)} className="modal-close">×</button>
              <iframe
                src={`/demos/${selectedExample}.html`}
                title="Démo plein écran"
                className="modal-iframe"
              />
              <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    toast.success("Modèle sélectionné.");
                  }}
                  className="explore-button"
                >
                  Choisir ce modèle
                </button>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setSelectedExample(null);
                  }}
                  className="explore-button"
                  style={{ background: '#555' }}
                >
                  Retour
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Estimation;