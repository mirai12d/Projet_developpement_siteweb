import React, { useState } from 'react';
import './Estimation.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ✅ i18n

const examples = [
  {
    id: 'site_vitrine',
    titleKey: 'estimation.examples.site_vitrine.title',
    descKey: 'estimation.examples.site_vitrine.desc',
    image: '/examples/photographe.jpg'
  },
  {
    id: 'ecommerce',
    titleKey: 'estimation.examples.ecommerce.title',
    descKey: 'estimation.examples.ecommerce.desc',
    image: '/examples/ecommerce.jpg'
  },
  {
    id: 'portfolio',
    titleKey: 'estimation.examples.portfolio.title',
    descKey: 'estimation.examples.portfolio.desc',
    image: '/examples/portfolio.jpg'
  },
  {
    id: 'corporate',
    titleKey: 'estimation.examples.corporate.title',
    descKey: 'estimation.examples.corporate.desc',
    image: '/examples/corporate.jpg'
  }
];

const Estimation = () => {
  const { t } = useTranslation(); // ✅ hook
  const [selectedExample, setSelectedExample] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

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
        toast.success(t('estimation.success'));
        setFormData({
          nom: '',
          email: '',
          entreprise: '',
          budget: '',
          message: ''
        });
        setSelectedExample(null);
      } else {
        toast.error(t('estimation.error'));
      }
    } catch (err) {
      console.error('Erreur réseau :', err);
      toast.error(t('estimation.network'));
    }
  };

  return (
    <div className="estimation-container">
      <div style={{ textAlign: 'left' }}>
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          ← {t('estimation.backDashboard')}
        </button>
      </div>

      <h2>{t('estimation.title')}</h2>
      <p className="estimation-subtitle">{t('estimation.subtitle')}</p>

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
            <img src={example.image} alt={t(example.titleKey)} />
            <h3>{t(example.titleKey)}</h3>
            <p>{t(example.descKey)}</p>
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="estimation-form">
        <input type="text" name="nom" placeholder={t('estimation.fields.nom')} value={formData.nom} onChange={handleChange} required />
        <input type="email" name="email" placeholder={t('estimation.fields.email')} value={formData.email} onChange={handleChange} required />
        <input type="text" name="entreprise" placeholder={t('estimation.fields.entreprise')} value={formData.entreprise} onChange={handleChange} />
        <select name="budget" value={formData.budget} onChange={handleChange}>
          <option value="">{t('estimation.fields.budget')}</option>
          <option value="500-1000">{t('estimation.budgets.range1')}</option>
          <option value="1000-3000">{t('estimation.budgets.range2')}</option>
          <option value="3000+">{t('estimation.budgets.range3')}</option>
        </select>
        <textarea
          name="message"
          placeholder={t('estimation.fields.message')}
          rows="6"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">{t('estimation.send')}</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem' }}>
        {t('estimation.contactPrompt')}&nbsp;
        <Link to="/reservation" style={{ color: '#111', textDecoration: 'underline' }}>
          {t('estimation.bookNow')}
        </Link>
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
              <iframe
                src={`/demos/${selectedExample}.html`}
                title="Démo plein écran"
                className="modal-iframe"
              />
              <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    toast.success(t('estimation.modelSelected'));
                  }}
                  className="explore-button"
                >
                  {t('estimation.chooseModel')}
                </button>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setSelectedExample(null);
                  }}
                  className="explore-button"
                  style={{ background: '#555' }}
                >
                  {t('estimation.back')}
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
