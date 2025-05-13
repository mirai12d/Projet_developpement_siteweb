    import React, { useState } from 'react';
    import MemberLayout from '../../layouts/MemberLayout';
    import './Support.css';
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';

    const Support = () => {
    const [formData, setFormData] = useState({
        nom: localStorage.getItem('userPrenom') + ' ' + localStorage.getItem('userNom'),
        email: localStorage.getItem('userEmail'),
        sujet: '',
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
        try {
          const response = await fetch('http://localhost:3001/api/support', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          if (response.ok) {
            toast.success('Demande de support envoyée !');
            setFormData({ ...formData, sujet: '', message: '' });
          } else {
            toast.error("Erreur lors de l'envoi.");
          }
        } catch (error) {
          toast.error("Erreur serveur.");
          console.error(error);
        }
      };
      

    return (
        <MemberLayout>
        <div className="support-container">
            <h2>Assistance & Support</h2>
            <p className="support-subtitle">Décrivez votre problème ou posez une question, notre équipe vous répondra rapidement.</p>

            <form onSubmit={handleSubmit} className="support-form">
            <input type="text" value={formData.nom} disabled />
            <input type="email" value={formData.email} disabled />
            <input
                type="text"
                name="sujet"
                placeholder="Sujet"
                value={formData.sujet}
                onChange={handleChange}
                required
            />
            <textarea
                name="message"
                placeholder="Votre message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
            ></textarea>

            <button type="submit">Envoyer la demande</button>
            </form>

            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
        </MemberLayout>
    );
    };

    export default Support;
